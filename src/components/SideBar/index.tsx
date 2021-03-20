import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button } from "../Button";

import './sidebar.scss';

interface SideBarProps{
  genreId: number;
  onSelectGenre: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({ genreId, onSelectGenre} : SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => onSelectGenre(genre.id)}
              selected={genreId === genre.id}
            />
          ))}
        </div>

      </nav>
  );
}