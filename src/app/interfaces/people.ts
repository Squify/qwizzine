export interface People {
  id: number,
  name: string,
  profile_path: string,
  known_for: [{
    id: number,
    title: string,
    media_type: string,
    poster_path: string
  }]
}
