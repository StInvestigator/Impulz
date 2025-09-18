import Skeleton from "@mui/material/Skeleton";
import type { AuthorSimpleDto } from "../../models/DTO/AuthorSimpleDto.ts";
import ListCarousel from "../ListCarousel.tsx";
import AuthorSmallItem from "../items/author/AuthorSmallItem.tsx";
import { type FC } from "react";

interface AuthorListProps {
  authors: AuthorSimpleDto[];
  isLoading: boolean;
  error: string | null;
  itemWidth: number;
  name: string;
  url: string;  
}

const AuthorCarouselList: FC<AuthorListProps> = ({
  authors,
  itemWidth,
  name,
  isLoading,
  error,
  url,
}) => {
  return (
    <>
      {isLoading || error ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="285px"
          sx={{ borderRadius: "10px" }}
        />
      ) : (
        <ListCarousel
          title={name}
          gap={24}
          variant={"h3"}
          count_items={authors.length}
          bgColor={"var(--dark-purple)"}
          textColor={"var(--deep-sky-blue)"}
          url={url}
        >
          {authors.map((author, index) => (
            <AuthorSmallItem key={index} author={author} itemWidth={itemWidth} />
          ))}
        </ListCarousel>
      )}
    </>
  );
};

export default AuthorCarouselList;
