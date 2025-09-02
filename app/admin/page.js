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

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const flag = Cookies.get("adminAccess");
    if (flag === "true") setIsAuthed(true);
  }, []);

  return (
    <>{isAuthed ? <Dashboard /> : <LoginForm setIsAuthed={setIsAuthed} />}</>
  );

  function Dashboard() {
    const tabs = ["Overview", "Users", "Movies", "Genres"];
    const [activeTab, setActiveTab] = useState("Overview");
    const [isUploading, setIsUploading] = useState(false);

    const [moviesView, setMoviesView] = useState("list");
    const { data: user } = useUserData(!!useAuthStore.getState().token);

    const { data } = useAllUserData(!!useAuthStore?.getState().token);
    const { mutate } = useUpdateRole(!!useAuthStore?.getState().token);
    const { data: movieData } = useMoviesData();
    const { mutate: deteleMovie } = useDeleteMovie(
      !!useAuthStore?.getState().token
    );
    const { mutate: updateMovies } = useEditMovies();

    const { uploadMovie, loading, error } = useUploadMovie(
      useAuthStore.getState().token
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

        console.log("Only updated fields:", updatedFields);
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
      deteleMovie(id);
      setMovies((arr) => arr.filter((m) => m.id !== id));
      if (movie.id === id) setMovie(defaultMovie);
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
                Cookies.remove("adminAccess");
                useAuthStore.getState().logout();
                setIsAuthed(false);
              }}
            >
              Logout
            </NavBtn>
          </Sidebar>

          <Content $direction="column">
            {activeTab === "Overview" && (
              <Card $direction="column">
                <Title>Overview</Title>
                <SmallHint>Quick snapshot of your app (static demo).</SmallHint>
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
                      console.log("u", u);
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
                            {/* <SecondaryBtn
                              type="button"
                              onClick={() => onEditMovie(m.id)}
                            >
                              Edit
                            </SecondaryBtn> */}
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
                          {movie.id ? "Edit Movie" : "Add New Movie"}
                        </Title>
                        <SmallHint>
                          {movie.id
                            ? `Editing: ${movie.title || "Untitled Movie"}`
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
                              value={movie.releaseDate}
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
                          disabled={loading}
                          as="button"
                          type="submit"
                          $alignitems="center"
                          $justifycontent="center"
                        >
                          {!loading
                            ? movie.id
                              ? "Update Movie"
                              : "Create Movie"
                            : "Uploading Movies..."}
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
      </Main>
    );
  }
}

const Main = styled(Flex)`
  height: 100vh;
  padding: 16px;
  gap: 16px;
  z-index: 10;
  position: relative;
  overflow: hidden;
`;

const PageTitle = styled.h1`
  margin: 0 0 8px 0;
  font-family: "HelveticaBold";
  font-size: 28px;
  color: #fff;
`;

const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  height: calc(100vh - 80px);
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  border: 1px solid #414141;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  padding: 12px;
  height: fit-content;
`;

const Content = styled(Flex)`
  gap: 16px;
  height: 100%;
  overflow: hidden;
`;

const NavBtn = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  margin-bottom: 6px;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => ($active ? "#ef8a4c" : "#414141")};
  background: ${({ $active }) => ($active ? "#ef8a4c22" : "transparent")};
  color: #fff;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  background: #414141;
  margin: 8px 0 12px 0;
`;

const Kpis = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
`;

const KpiBox = styled.div`
  border: 1px solid #414141;
  border-radius: 10px;
  padding: 14px;
`;

const KpiTitle = styled.div`
  opacity: 0.7;
  font-size: 12px;
  color: #fff;
`;

const KpiValue = styled.div`
  font-family: "HelveticaBold";
  font-size: 24px;
  color: #fff;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #fff;

  th,
  td {
    border-bottom: 1px solid #414141;
    padding: 10px 8px;
    text-align: left;
  }

  thead th {
    opacity: 0.8;
    font-weight: 500;
  }
`;

const Card = styled(Flex)`
  width: 100%;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #414141;
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
`;

const Title = styled.h2`
  margin: 0 0 4px 0;
  font-family: "HelveticaBold";
  font-size: 22px;
  color: #fff;
`;

const SmallHint = styled.div`
  opacity: 0.6;
  font-size: 12px;
  color: #fff;
  margin-top: -6px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-family: "HelveticaRegular";
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
`;

const SmallLabel = styled(Label)`
  font-size: 12px;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #414141;
  background: transparent;
  color: #fff;
  outline: none;

  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SmallInput = styled(Input)`
  padding: 10px 12px;
`;

const Textarea = styled.textarea`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #414141;
  background: transparent;
  color: #fff;
  outline: none;
  resize: vertical;

  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #414141;
  background: transparent;
  color: #fff;
  outline: none;
`;

const SubmitBtn = styled(Flex)`
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid rgba(255, 126, 55, 0.2);
  background-image: linear-gradient(101deg, #ff670a 2%, #ef8a4c 82%);
  color: #fff;
  font-family: "HelveticaRegular";
  font-size: 16px;
`;

const SecondaryBtn = styled.button`
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #414141;
  background: transparent;
  color: #fff;
  font-family: "HelveticaRegular";
  font-size: 14px;
`;

const DangerBtn = styled(SecondaryBtn)`
  border-color: #8b2b2b;
  color: #ff8a8a;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.button`
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? "#ef8a4c" : "#414141")};
  background: ${({ $active }) => ($active ? "#ef8a4c22" : "transparent")};
  color: #fff;
  font-size: 12px;
  cursor: pointer;
`;

const RoleBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${({ $role }) => {
    switch ($role) {
      case "ADMIN":
        return "#ef8a4c22";
      case "CREATOR":
        return "#4cef8a22";
      case "USER":
      default:
        return "#8a8aef22";
    }
  }};
  border: 1px solid
    ${({ $role }) => {
      switch ($role) {
        case "ADMIN":
          return "#ef8a4c";
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
        return "#ef8a4c";
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
  border: 1px solid #414141;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: #ef8a4c;
  }

  &:focus {
    border-color: #ef8a4c;
    box-shadow: 0 0 0 2px rgba(239, 138, 76, 0.2);
  }

  option {
    background: #2a2a2a;
    color: #fff;
  }
`;

const FileInput = styled.input`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #414141;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  outline: none;
  cursor: pointer;

  &:hover {
    border-color: #ef8a4c;
  }

  &:focus {
    border-color: #ef8a4c;
    box-shadow: 0 0 0 2px rgba(239, 138, 76, 0.2);
  }

  &::file-selector-button {
    background: #ef8a4c;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 8px 12px;
    margin-right: 12px;
    cursor: pointer;
    font-size: 12px;
    font-family: "HelveticaRegular";

    &:hover {
      background: #ff670a;
    }
  }
`;

const MovieForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(239, 138, 76, 0.3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(239, 138, 76, 0.5);
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-family: "HelveticaBold";
  font-size: 18px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #414141;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  gap: 8px;
  padding: 8px 0;
`;

const GenreTag = styled.button`
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid ${({ $active }) => ($active ? "#ef8a4c" : "#414141")};
  background: ${({ $active }) => ($active ? "#ef8a4c22" : "transparent")};
  color: ${({ $active }) => ($active ? "#ef8a4c" : "#fff")};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ef8a4c;
    background: #ef8a4c11;
  }
`;

const FileUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

const FileUploadLabel = styled.label`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  border: 2px dashed #414141;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ef8a4c;
    background: rgba(239, 138, 76, 0.05);
  }

  input[type="file"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const FileUploadText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #fff;
  font-size: 14px;
`;

const FileUploadHint = styled.div`
  font-size: 11px;
  opacity: 0.6;
  color: #fff;
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
  max-height: 400px;
  overflow-y: auto;

  /* Subtle scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(239, 138, 76, 0.3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(239, 138, 76, 0.5);
  }
`;

const EpisodeCard = styled.div`
  border: 1px solid #414141;
  border-radius: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
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
  font-family: "HelveticaBold";
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
  padding: 32px;
  color: #fff;
  opacity: 0.6;
  border: 1px dashed #414141;
  border-radius: 8px;
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #414141;
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
  /* grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); */
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;

  /* Subtle scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(239, 138, 76, 0.3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(239, 138, 76, 0.5);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MovieCard = styled.div`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #414141;
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 190px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ef8a4c;
    background: rgba(239, 138, 76, 0.05);
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
  font-family: "HelveticaBold";
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
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${({ $type }) =>
    $type === "SERIES" ? "#4cef8a22" : "#8a8aef22"};
  border: 1px solid
    ${({ $type }) => ($type === "SERIES" ? "#4cef8a" : "#8a8aef")};
  color: ${({ $type }) => ($type === "SERIES" ? "#4cef8a" : "#8a8aef")};
`;

const MovieDuration = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`;

const MovieGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const GenreChip = styled.span`
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 10px;
  background: rgba(239, 138, 76, 0.15);
  color: #ef8a4c;
  text-transform: capitalize;
`;

const MovieActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid #414141;
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

  div {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.7;
  }

  h3 {
    margin: 0 0 8px 0;
    font-family: "HelveticaBold";
    font-size: 24px;
    color: #fff;
  }

  p {
    margin: 0 0 24px 0;
    opacity: 0.6;
    max-width: 400px;
    line-height: 1.5;
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
