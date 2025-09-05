"use client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import Flex from "/lib/atoms/Flex";
import LoginForm from "/imports/Auth/Components/LoginForm";
import { useAllUserData, useUpdateRole, useUserData } from "api/user";
import { useDeleteMovie, useEditMovies, useMoviesData } from "api/movies";
import { useAuthStore } from "store/authStore";
import { useUploadMovie } from "lib/hooks/useUploadMovie";
import { keyframes } from "styled-components";
import Loading from "imports/common/components/Loading";
import Modal from "imports/common/components/Modal";

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const flag = Cookies.get("adminAccess");
    if (flag === "true") {
      setIsAuthed(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>{isAuthed ? <Dashboard /> : <LoginForm setIsAuthed={setIsAuthed} />}</>
  );

  function Dashboard() {
    const tabs = ["Overview", "Users", "Movies", "Genres"];
    const [activeTab, setActiveTab] = useState("Overview");
    const [isUploading, setIsUploading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);

    const [moviesView, setMoviesView] = useState("list");
    const { data: user } = useUserData(!!useAuthStore.getState().token);

    const { data } = useAllUserData(!!useAuthStore?.getState().token);
    const { mutate } = useUpdateRole(!!useAuthStore?.getState().token);
    const { data: movieData, refetch } = useMoviesData();
    const { mutate: deteleMovie } = useDeleteMovie(
      !!useAuthStore?.getState().token
    );
    const { mutate: updateMovies } = useEditMovies();

    const { uploadMovie, loading, error } = useUploadMovie(
      useAuthStore.getState().token,
      refetch
    );

    useEffect(() => {
      const beforeUnload = (e) => {
        if (isUploading) {
          e.preventDefault();
          e.returnValue = "";
        }
      };

      if (isUploading) {
        window.addEventListener("beforeunload", beforeUnload);
      }

      return () => {
        window.removeEventListener("beforeunload", beforeUnload);
      };
    }, [isUploading]);

    const defaultMovie = useMemo(
      () => ({
        id: undefined,
        title: "",
        description: "",
        uploaderId: user?.userData?.id,
        releaseDate: "",
        duration: 90,
        posterImage: null,
        trailerVideo: null,
        movieVideo: null,
        type: "SERIES",
        genres: [],
        episodes: [],
      }),
      []
    );

    const [movie, setMovie] = useState(defaultMovie);
    const [originalMovie, setOriginalMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [savedJson, setSavedJson] = useState(null);

    const [userQuery, setUserQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
      setMovies(movieData?.allMovies);
    }, [movieData]);

    useEffect(() => {
      setUsers(data?.AllUser);
    }, [data]);

    const availableRoles = ["USER", "ADMIN", "CREATOR"];

    const updateUserRole = (userId, newRole) => {
      mutate({
        role: newRole.toLowerCase(),
        userId,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    };

    const filteredUsers = users?.filter(
      (u) =>
        u.name.toLowerCase().includes(userQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(userQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(userQuery.toLowerCase())
    );

    const genreOptions = [
      { id: "action", name: "Action" },
      { id: "comedy", name: "Comedy" },
      { id: "drama", name: "Drama" },
      { id: "thriller", name: "Thriller" },
      { id: "sci-fi", name: "Sci-Fi" },
      { id: "romance", name: "Romance" },
      { id: "horror", name: "Horror" },
      { id: "animation", name: "Animation" },
    ];

    const toggleGenre = (id) => {
      setMovie((m) => {
        const has = m.genres.includes(id);
        return {
          ...m,
          genres: has ? m.genres.filter((g) => g !== id) : [...m.genres, id],
        };
      });
    };

    const setField = (key, value) => setMovie((m) => ({ ...m, [key]: value }));

    const addEpisode = () => {
      setMovie((m) => ({
        ...m,
        episodes: [
          ...m.episodes,
          {
            id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
            title: "",
            season: 1,
            episodeNo: 1,
            episodeVideo: null,
            duration: 45,
          },
        ],
      }));
    };

    const updateEpisode = (id, key, value) => {
      setMovie((m) => ({
        ...m,
        episodes: m.episodes.map((e) =>
          e.id === id ? { ...e, [key]: value } : e
        ),
      }));
    };

    const removeEpisode = (id) => {
      setMovie((m) => ({
        ...m,
        episodes: m.episodes.filter((e) => e.id !== id),
      }));
    };

    const onSave = async (e) => {
      e.preventDefault();

      if (movie.id && originalMovie) {
        const updatedFields = {};
        updatedFields.movieId = movie.id;
        Object.keys(movie).forEach((key) => {
          const originalValue = originalMovie[key];
          const currentValue = movie[key];

          if (key === "genres" || key === "episodes") {
            if (
              JSON.stringify(originalValue) !== JSON.stringify(currentValue)
            ) {
              updatedFields[key] = currentValue;
            }
          } else if (originalValue !== currentValue) {
            updatedFields[key] = currentValue;
          }
        });

        if (Object.keys(updatedFields).length <= 1) {
          // No changes other than movieId
          setMoviesView("list");
          setOriginalMovie(null);
          return;
        }

        const formData = new FormData();
        Object.entries(updatedFields).forEach(([key, value]) => {
          if (key === "genres") {
            formData.append(key, JSON.stringify(value));
          } else if (key === "episodes") {
            const episodesData = value.map((ep) => {
              const { id, episodeVideo, ...rest } = ep;
              return rest;
            });
            formData.append("episodes", JSON.stringify(episodesData));
            value.forEach((ep, index) => {
              if (ep.episodeVideo instanceof File) {
                formData.append(
                  `episodeVideo_${index}`,
                  ep.episodeVideo,
                  ep.episodeVideo.name
                );
              }
            });
          } else if (value instanceof File) {
            formData.append(key, value, value.name);
          } else if (value === null) {
            formData.append(key, "");
          } else {
            formData.append(key, value);
          }
        });

        updateMovies(formData);

        setMovies((arr) =>
          arr.map((m) => (m.id === movie.id ? { ...m, ...movie } : m))
        );
        setSavedJson(updatedFields);
      } else {
        setIsUploading(true);
        await uploadMovie({
          title: movie.title,
          description: "A sci-fi thriller about dreams within dreams.",
          releaseDate: movie.releaseDate,
          duration: 148,
          uploaderId: user?.userData?.id,
          type: movie.type,
          genres: movie.genres,
          posterImage: movie.posterImage,
          trailerVideo: movie.trailerVideo,
          movieVideo: movie.movieVideo,
          episodes: movie.episodes,
        }).finally(() => setIsUploading(false));
        const id = crypto.randomUUID ? crypto.randomUUID() : `m_${Date.now()}`;
        setMovies((arr) => [...arr, { ...movie, id }]);
        setMovie((m) => ({ ...m, id }));
        setSavedJson(movie);
      }

      setMoviesView("list");
      setOriginalMovie(null);
    };

    const onEditMovie = (id) => {
      const m = movies?.find((x) => x.id === id);
      if (!m) return;

      const movieToEdit = {
        id: m.id,
        title: m.title || "",
        description: m.description || "",
        releaseDate: m.releaseDate || "",
        duration: m.duration || 90,
        posterImage: m.posterImage || null,
        trailerVideo: m.trailerVideo || null,
        movieVideo: m.movieVideo || null,
        type: m.type || "MOVIE",
        genres: m.genres || [],
        episodes: m.episodes || [],
      };
      setMovie(movieToEdit);
      setOriginalMovie(movieToEdit);
      setMoviesView("form");
    };

    const onDeleteMovie = (id) => {
      setMovieToDelete(id);
      setShowDeleteModal(true);
    };

    const onReset = () => {
      setMovie(defaultMovie);
      setSavedJson(null);
      setOriginalMovie(null);
    };

    return (
      <Main $direction="column" $fullwidth>
        <PageTitle>Admin Dashboard</PageTitle>
        <DashboardLayout>
          <Sidebar>
            {tabs.map((t) => (
              <NavBtn
                key={t}
                $active={activeTab === t}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </NavBtn>
            ))}
            <Divider />
            <NavBtn
              onClick={() => {
                setShowLogoutModal(true);
              }}
            >
              Logout
            </NavBtn>
          </Sidebar>

          <Content $direction="column">
            {activeTab === "Overview" && (
              <Card $direction="column">
                <Title>Overview</Title>
                <SmallHint>Quick snapshot of your app.</SmallHint>
                <Kpis>
                  <KpiBox>
                    <KpiTitle>Total Users</KpiTitle>
                    <KpiValue>{users?.length}</KpiValue>
                  </KpiBox>
                  <KpiBox>
                    <KpiTitle>Total Movies</KpiTitle>
                    <KpiValue>{movies?.length}</KpiValue>
                  </KpiBox>
                </Kpis>
              </Card>
            )}

            {activeTab === "Users" && (
              <Card $direction="column">
                <Title>Users</Title>
                <SearchRow>
                  <Input
                    placeholder="Search by name, email, or role"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                  />
                </SearchRow>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers?.map((u) => {
                      return (
                        <tr key={u.id}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <RoleBadge $role={u.role}>{u.role}</RoleBadge>
                          </td>
                          <td>{u.createdAt}</td>
                          <td>
                            <RoleSelect
                              value={u.role}
                              onChange={(e) =>
                                updateUserRole(u.id, e.target.value)
                              }
                            >
                              {availableRoles.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </RoleSelect>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredUsers?.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          style={{ textAlign: "center", opacity: 0.6 }}
                        >
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card>
            )}

            {activeTab === "Movies" && (
              <>
                {moviesView === "list" ? (
                  <MoviesListView>
                    <MoviesHeader>
                      <div>
                        <Title>Movies Management</Title>
                        <SmallHint>
                          Manage your movies and TV series collection.
                        </SmallHint>
                      </div>
                      <SubmitBtn
                        as="button"
                        type="button"
                        onClick={() => {
                          setMovie(defaultMovie);
                          setMoviesView("form");
                        }}
                        $alignitems="center"
                        $justifycontent="center"
                      >
                        + Add Movie
                      </SubmitBtn>
                    </MoviesHeader>

                    <MoviesGrid>
                      {movies?.map((m) => (
                        <MovieCard key={m.id}>
                          <MovieInfo>
                            <MovieTitle>{m.title}</MovieTitle>
                            <MovieMeta>
                              <MovieType $type={m.type}>{m.type}</MovieType>
                              <MovieDuration>{m.duration} min</MovieDuration>
                            </MovieMeta>
                            {m.genres && m.genres.length > 0 && (
                              <MovieGenres>
                                {m.genres.map((genre) => (
                                  <GenreChip key={genre?.id}>
                                    {genre?.name}
                                  </GenreChip>
                                ))}
                              </MovieGenres>
                            )}
                          </MovieInfo>
                          <MovieActions>
                            <SecondaryBtn
                              type="button"
                              onClick={() => onEditMovie(m.id)}
                            >
                              View
                            </SecondaryBtn>
                            <DangerBtn
                              type="button"
                              onClick={() => onDeleteMovie(m.id)}
                            >
                              Delete
                            </DangerBtn>
                          </MovieActions>
                        </MovieCard>
                      ))}
                      {movies?.length === 0 && (
                        <EmptyMoviesState>
                          <div>🎬</div>
                          <h3>No movies yet</h3>
                          <p>
                            Start building your collection by adding your first
                            movie.
                          </p>
                          <SubmitBtn
                            as="button"
                            type="button"
                            onClick={() => {
                              setMovie(defaultMovie);
                              setMoviesView("form");
                            }}
                            $alignitems="center"
                            $justifycontent="center"
                          >
                            + Add Your First Movie
                          </SubmitBtn>
                        </EmptyMoviesState>
                      )}
                    </MoviesGrid>
                  </MoviesListView>
                ) : (
                  <MovieFormView>
                    <FormHeader>
                      <div>
                        <Title>
                          {movie.id ? "View Movie" : "Add New Movie"}
                        </Title>
                        <SmallHint>
                          {movie.id
                            ? `View: ${movie.title || "Untitled Movie"}`
                            : "Fill in the details to add a new movie to your collection."}
                        </SmallHint>
                      </div>
                      <SecondaryBtn
                        type="button"
                        onClick={() => {
                          setMoviesView("list");
                          setMovie(defaultMovie);
                          setOriginalMovie(null);
                        }}
                      >
                        ← Back to List
                      </SecondaryBtn>
                    </FormHeader>

                    <MovieForm onSubmit={onSave}>
                      <FormSection>
                        <SectionTitle>Basic Information</SectionTitle>
                        <FieldGroup>
                          <FormField>
                            <Label>Movie Title *</Label>
                            <Input
                              value={movie.title}
                              onChange={(e) =>
                                setField("title", e.target.value)
                              }
                              placeholder="Enter movie title"
                              required
                            />
                          </FormField>

                          <FormField>
                            <Label>Description</Label>
                            <Textarea
                              value={movie.description}
                              onChange={(e) =>
                                setField("description", e.target.value)
                              }
                              placeholder="Brief description of the movie"
                              rows={3}
                            />
                          </FormField>
                        </FieldGroup>
                      </FormSection>

                      <FormSection>
                        <SectionTitle>Movie Details</SectionTitle>
                        <TwoColumnGrid>
                          <FormField>
                            <Label>Type *</Label>
                            <Select
                              value={movie.type}
                              onChange={(e) => setField("type", e.target.value)}
                            >
                              <option value="SERIES">TV Series</option>
                            </Select>
                          </FormField>

                          <FormField>
                            <Label>Duration (minutes) *</Label>
                            <Input
                              type="number"
                              min={1}
                              value={movie.duration}
                              onChange={(e) =>
                                setField("duration", Number(e.target.value))
                              }
                              placeholder="120"
                            />
                          </FormField>

                          <FormField>
                            <Label>Release Date</Label>
                            <Input
                              type="date"
                              value={movie?.releaseDate}
                              onChange={(e) =>
                                setField("releaseDate", e.target.value)
                              }
                            />
                          </FormField>

                          <FormField>
                            <Label>Genres</Label>
                            <GenreContainer>
                              {genreOptions.map((g) => (
                                <GenreTag
                                  key={g.id}
                                  type="button"
                                  $active={movie.genres.includes(g.id)}
                                  onClick={() => toggleGenre(g.id)}
                                >
                                  {g.name}
                                </GenreTag>
                              ))}
                            </GenreContainer>
                          </FormField>
                        </TwoColumnGrid>
                      </FormSection>

                      <FormSection>
                        <SectionTitle>Media Files</SectionTitle>
                        <ThreeColumnGrid>
                          <FormField>
                            <Label>Poster Image *</Label>
                            <FileUploadArea>
                              <FileInput
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  setField("posterImage", e.target.files[0])
                                }
                                id="poster-upload"
                              />
                              <FileUploadLabel htmlFor="poster-upload">
                                {movie.posterImage ? (
                                  <FileSelected>
                                    ✓ {movie.posterImage.name}
                                  </FileSelected>
                                ) : (
                                  <FileUploadText>
                                    📷 Choose Image
                                    <FileUploadHint>
                                      JPG, PNG, GIF
                                    </FileUploadHint>
                                  </FileUploadText>
                                )}
                              </FileUploadLabel>
                            </FileUploadArea>
                          </FormField>

                          <FormField>
                            <Label>Trailer Video</Label>
                            <FileUploadArea>
                              <FileInput
                                type="file"
                                accept="video/mp4,video/avi,video/mov,video/wmv"
                                onChange={(e) =>
                                  setField("trailerVideo", e.target.files[0])
                                }
                                id="trailer-upload"
                              />
                              <FileUploadLabel htmlFor="trailer-upload">
                                {movie.trailerVideo ? (
                                  <FileSelected>
                                    ✓ {movie.trailerVideo.name}
                                  </FileSelected>
                                ) : (
                                  <FileUploadText>
                                    🎬 Choose Trailer
                                    <FileUploadHint>
                                      MP4, AVI, MOV
                                    </FileUploadHint>
                                  </FileUploadText>
                                )}
                              </FileUploadLabel>
                            </FileUploadArea>
                          </FormField>

                          {/* <FormField>
                            <Label>Main Video *</Label>
                            <FileUploadArea>
                              <FileInput
                                type="file"
                                accept="video/mp4"
                                onChange={(e) =>
                                  setField("movieVideo", e.target.files[0])
                                }
                                id="movie-upload"
                              />
                              <FileUploadLabel htmlFor="movie-upload">
                                {movie.movieVideo ? (
                                  <FileSelected>
                                    ✓ {movie.movieVideo.name}
                                  </FileSelected>
                                ) : (
                                  <FileUploadText>
                                    🎥 Choose Video
                                    <FileUploadHint>MP4 only</FileUploadHint>
                                  </FileUploadText>
                                )}
                              </FileUploadLabel>
                            </FileUploadArea>
                          </FormField> */}
                        </ThreeColumnGrid>
                      </FormSection>

                      {movie.type === "SERIES" && (
                        <FormSection>
                          <SectionTitle>
                            Episodes
                            <SecondaryBtn type="button" onClick={addEpisode}>
                              + Add Episode
                            </SecondaryBtn>
                          </SectionTitle>

                          {movie.episodes.length > 0 ? (
                            <EpisodeContainer>
                              {movie.episodes.map((ep, i) => (
                                <EpisodeCard key={ep.id}>
                                  <EpisodeHeader>
                                    <EpisodeTitle>Episode {i + 1}</EpisodeTitle>
                                    <DangerBtn
                                      type="button"
                                      onClick={() => removeEpisode(ep.id)}
                                    >
                                      Remove
                                    </DangerBtn>
                                  </EpisodeHeader>

                                  <EpisodeGrid>
                                    <FormField>
                                      <SmallLabel>Title</SmallLabel>
                                      <SmallInput
                                        value={ep.title}
                                        onChange={(e) =>
                                          updateEpisode(
                                            ep.id,
                                            "title",
                                            e.target.value
                                          )
                                        }
                                        placeholder="Episode title"
                                      />
                                    </FormField>

                                    <FormField>
                                      <SmallLabel>Season</SmallLabel>
                                      <SmallInput
                                        type="number"
                                        min={1}
                                        value={ep.season}
                                        onChange={(e) =>
                                          updateEpisode(
                                            ep.id,
                                            "season",
                                            Number(e.target.value)
                                          )
                                        }
                                      />
                                    </FormField>

                                    <FormField>
                                      <SmallLabel>Episode No.</SmallLabel>
                                      <SmallInput
                                        type="number"
                                        min={1}
                                        value={i + 1}
                                        onChange={(e) =>
                                          updateEpisode(
                                            ep.id,
                                            "episodeNo",
                                            Number(e.target.value)
                                          )
                                        }
                                      />
                                    </FormField>

                                    <FormField>
                                      <SmallLabel>Duration (min)</SmallLabel>
                                      <SmallInput
                                        type="number"
                                        min={1}
                                        value={ep.duration}
                                        onChange={(e) =>
                                          updateEpisode(
                                            ep.id,
                                            "duration",
                                            Number(e.target.value)
                                          )
                                        }
                                      />
                                    </FormField>
                                  </EpisodeGrid>

                                  <FormField>
                                    <SmallLabel>Episode Video (MP4)</SmallLabel>
                                    <FileUploadArea>
                                      <FileInput
                                        type="file"
                                        accept="video/mp4"
                                        onChange={(e) =>
                                          updateEpisode(
                                            ep.id,
                                            "episodeVideo",
                                            e.target.files[0]
                                          )
                                        }
                                        id={`episode-${ep.id}-upload`}
                                      />
                                      <FileUploadLabel
                                        htmlFor={`episode-${ep.id}-upload`}
                                      >
                                        {ep.episodeVideo ? (
                                          <FileSelected>
                                            ✓ {ep.episodeVideo.name}
                                          </FileSelected>
                                        ) : (
                                          <FileUploadText>
                                            🎥 Choose Episode Video
                                            <FileUploadHint>
                                              MP4 only
                                            </FileUploadHint>
                                          </FileUploadText>
                                        )}
                                      </FileUploadLabel>
                                    </FileUploadArea>
                                  </FormField>
                                </EpisodeCard>
                              ))}
                            </EpisodeContainer>
                          ) : (
                            <EmptyEpisodes>
                              No episodes added yet. Click &quot;Add
                              Episode&quot; to get started.
                            </EmptyEpisodes>
                          )}
                        </FormSection>
                      )}

                      <FormActions>
                        <SubmitBtn
                          disabled={loading || movie.id}
                          as="button"
                          type="submit"
                          $alignitems="center"
                          $justifycontent="center"
                        >
                          {loading ? (
                            <>
                              <Spinner />
                              Uploading Movies...
                            </>
                          ) : movie.id ? (
                            "Create Movie"
                          ) : (
                            "Create Movie"
                          )}
                        </SubmitBtn>
                        <SecondaryBtn
                          type="button"
                          onClick={() => {
                            setMoviesView("list");
                            setMovie(defaultMovie);
                            setOriginalMovie(null);
                          }}
                        >
                          Cancel
                        </SecondaryBtn>
                      </FormActions>
                    </MovieForm>
                  </MovieFormView>
                )}
              </>
            )}

            {activeTab === "Genres" && (
              <Card $direction="column">
                <Title>Genres</Title>
                <SmallHint>
                  Static predefined genres. Extend as needed.
                </SmallHint>
                <Tags>
                  {genreOptions.map((g) => (
                    <Tag key={g.id} $active>
                      {g.name}
                    </Tag>
                  ))}
                </Tags>
              </Card>
            )}
          </Content>
        </DashboardLayout>
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <ModalContent>
              <ModalTitle>Confirm Deletion</ModalTitle>
              <P>Are you sure you want to delete this movie?</P>
              <ModalActions>
                <SecondaryBtn onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </SecondaryBtn>
                <DangerBtn
                  onClick={() => {
                    deteleMovie(movieToDelete);
                    setMovies((arr) =>
                      arr.filter((m) => m.id !== movieToDelete)
                    );
                    if (movie.id === movieToDelete) setMovie(defaultMovie);
                    setShowDeleteModal(false);
                    setMovieToDelete(null);
                  }}
                >
                  Delete
                </DangerBtn>
              </ModalActions>
            </ModalContent>
          </Modal>
        )}
        {showLogoutModal && (
          <Modal onClose={() => setShowLogoutModal(false)}>
            <ModalContent>
              <ModalTitle>Confirm Logout</ModalTitle>
              <P>Are you sure you want to logout?</P>
              <ModalActions>
                <SecondaryBtn onClick={() => setShowLogoutModal(false)}>
                  Cancel
                </SecondaryBtn>
                <SubmitBtn
                  onClick={() => {
                    Cookies.remove("adminAccess");
                    useAuthStore.getState().logout();
                    setIsAuthed(false);
                    setShowLogoutModal(false);
                  }}
                >
                  Logout
                </SubmitBtn>
              </ModalActions>
            </ModalContent>
          </Modal>
        )}
      </Main>
    );
  }
}

const Main = styled(Flex)`
  max-height: 100vh;
  background: #111;
  padding: 24px;
  gap: 24px;
  z-index: 10;
  position: relative;
  overflow: hidden;
  font-family: "HelveticaNowDisplay-Regular", sans-serif;
`;

const PageTitle = styled.h1`
  margin: 0 0 8px 0;
  font-family: "HelveticaNowDisplay-Bold", sans-serif;
  font-size: 32px;
  color: #fff;
`;

const P = styled.p`
  color: white;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top: 2px solid #ff670a;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 1s linear infinite;
  margin-right: 8px;
  display: inline-block;
`;

const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  height: calc(100vh - 100px);
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  border: 1px solid #222;
  border-radius: 16px;
  background: #1a1a1a;
  padding: 16px;
  height: fit-content;
`;

const Content = styled(Flex)`
  gap: 24px;
  height: 100%;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #111;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
`;

const NavBtn = styled.button`
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: ${({ $active }) => ($active ? "#ff670a22" : "transparent")};
  color: ${({ $active }) => ($active ? "#ff670a" : "#aaa")};
  cursor: pointer;
  font-size: 14px;
  font-family: "HelveticaNowDisplay-Medium", sans-serif;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #ff670a11;
    color: #ff670a;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #222;
  margin: 12px 0;
`;

const Kpis = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const KpiBox = styled.div`
  border: 1px solid #222;
  border-radius: 12px;
  padding: 20px;
  background: #1a1a1a;
`;

const KpiTitle = styled.div`
  opacity: 0.6;
  font-size: 14px;
  color: #aaa;
`;

const KpiValue = styled.div`
  font-family: "HelveticaNowDisplay-Bold", sans-serif;
  font-size: 36px;
  color: #fff;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #fff;

  th,
  td {
    padding: 14px 10px;
    text-align: left;
    border-bottom: 1px solid #222;
  }

  thead th {
    font-family: "HelveticaNowDisplay-Bold", sans-serif;
    color: #aaa;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  tbody tr {
    transition: background 0.2s ease;
    &:hover {
      background: #1f1f1f;
    }
  }
`;

const Card = styled(Flex)`
  width: 100%;
  gap: 20px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #222;
  background: #1a1a1a;
  overflow: hidden;
`;

const Title = styled.h2`
  margin: 0 0 4px 0;
  font-family: "HelveticaNowDisplay-Bold", sans-serif;
  font-size: 24px;
  color: #fff;
`;

const SmallHint = styled.div`
  opacity: 0.6;
  font-size: 14px;
  color: #aaa;
  margin-top: -4px;
`;

const Label = styled.label`
  font-family: "HelveticaNowDisplay-Medium", sans-serif;
  font-size: 14px;
  color: #aaa;
`;

const SmallLabel = styled(Label)`
  font-size: 12px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #333;
  background: #222;
  color: #fff;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    border-color: #ff670a;
  }
`;

const SmallInput = styled(Input)`
  padding: 10px 14px;
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #333;
  background: #222;
  color: #fff;
  outline: none;
  resize: vertical;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    border-color: #ff670a;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #333;
  background: #222;
  color: #fff;
  outline: none;
  font-size: 14px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 16px center;
`;

const SubmitBtn = styled(Flex)`
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #ff670a;
  background: #ff670a;
  color: #fff;
  font-family: "HelveticaNowDisplay-Bold", sans-serif;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: #e05a00;
    border-color: #e05a00;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SecondaryBtn = styled.button`
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #333;
  background: transparent;
  color: #aaa;
  font-family: "HelveticaNowDisplay-Medium", sans-serif;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #222;
    color: #fff;
  }
`;

const DangerBtn = styled(SecondaryBtn)`
  border-color: #502020;
  color: #ff8a8a;

  &:hover {
    background: #502020;
    color: #ff8a8a;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => ($active ? "#ff670a" : "#333")};
  background: ${({ $active }) => ($active ? "#ff670a22" : "#222")};
  color: ${({ $active }) => ($active ? "#ff670a" : "#aaa")};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff670a;
    color: #ff670a;
  }
`;

const RoleBadge = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${({ $role }) => {
    switch ($role) {
      case "ADMIN":
        return "#ff670a33";
      case "CREATOR":
        return "#4cef8a33";
      case "USER":
      default:
        return "#8a8aef33";
    }
  }};
  border: 1px solid
    ${({ $role }) => {
      switch ($role) {
        case "ADMIN":
          return "#ff670a";
        case "CREATOR":
          return "#4cef8a";
        case "USER":
        default:
          return "#8a8aef";
      }
    }};
  color: ${({ $role }) => {
    switch ($role) {
      case "ADMIN":
        return "#ff670a";
      case "CREATOR":
        return "#4cef8a";
      case "USER":
      default:
        return "#8a8aef";
    }
  }};
`;

const RoleSelect = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #333;
  background: #222;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 8px center;

  &:hover {
    border-color: #ff670a;
  }

  &:focus {
    border-color: #ff670a;
    box-shadow: 0 0 0 2px #ff670a33;
  }

  option {
    background: #2a2a2a;
    color: #fff;
  }
`;

const MovieForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #111;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-family: "HelveticaNowDisplay-Bold", sans-serif;
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #222;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 0;
`;

const GenreTag = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => ($active ? "#ff670a" : "#333")};
  background: ${({ $active }) => ($active ? "#ff670a22" : "transparent")};
  color: ${({ $active }) => ($active ? "#ff670a" : "#aaa")};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff670a;
    background: #ff670a11;
    color: #ff670a;
  }
`;

const FileUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

const FileInput = styled.input`
  display: none;
`;

const FileUploadLabel = styled.label`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  border: 2px dashed #333;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff670a;
    background: #ff670a11;
  }
`;

const FileUploadText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #aaa;
  font-size: 14px;
`;

const FileUploadHint = styled.div`
  font-size: 12px;
  opacity: 0.6;
  color: #aaa;
`;

const FileSelected = styled.div`
  color: #4cef8a;
  font-size: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* Episode Components */
const EpisodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* max-height: 400px; */
  /* overflow-y: auto; */
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background: #111;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
`;

const EpisodeCard = styled.div`
  border: 1px solid #222;
  border-radius: 12px;
  padding: 20px;
  background: #111;
`;

const EpisodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const EpisodeTitle = styled.h4`
  margin: 0;
  color: #fff;
  font-family: "HelveticaNowDisplay-Bold", sans-serif;
  font-size: 16px;
`;

const EpisodeGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyEpisodes = styled.div`
  text-align: center;
  padding: 40px;
  color: #aaa;
  opacity: 0.6;
  border: 2px dashed #222;
  border-radius: 12px;
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid #222;
  margin-top: auto;
`;

/* New Movies List View Components */
const MoviesListView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const MoviesHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const MoviesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #111;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
`;

const MovieCard = styled.div`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #222;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff670a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px #00000033;
  }
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const MovieTitle = styled.h3`
  margin: 0;
  font-family: "HelveticaNowDisplay-Bold", sans-serif;
  font-size: 18px;
  color: #fff;
  line-height: 1.3;
`;

const MovieMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MovieType = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${({ $type }) =>
    $type === "SERIES" ? "#4cef8a33" : "#8a8aef33"};
  border: 1px solid
    ${({ $type }) => ($type === "SERIES" ? "#4cef8a" : "#8a8aef")};
  color: ${({ $type }) => ($type === "SERIES" ? "#4cef8a" : "#8a8aef")};
`;

const MovieDuration = styled.span`
  font-size: 12px;
  color: #aaa;
`;

const MovieGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const GenreChip = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  background: #ff670a22;
  color: #ff670a;
  text-transform: capitalize;
`;

const MovieActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #222;
`;

const EmptyMoviesState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  color: #fff;
  border: 2px dashed #222;
  border-radius: 16px;

  div {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.7;
  }

  h3 {
    margin: 0 0 8px 0;
    font-family: "HelveticaNowDisplay-Bold", sans-serif;
    font-size: 24px;
    color: #fff;
  }

  p {
    margin: 0 0 24px 0;
    opacity: 0.6;
    max-width: 400px;
    line-height: 1.5;
    color: #aaa;
  }
`;

/* Movie Form View Components */
const MovieFormView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const FormHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #222;
  width: 100%;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  margin: 0 0 16px 0;
  font-family: "HelveticaNowDisplay-Bold", sans-serif;
  font-size: 20px;
  color: #fff;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;
