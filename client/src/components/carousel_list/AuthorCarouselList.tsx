import { Skeleton } from "@mui/material";
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
}

const AuthorCarouselList: FC<AuthorListProps> = ({
  isLoading,
  error,
  authors,
  itemWidth,
  name,
}) => {
  return (
    <>
      {isLoading || error ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="280px"
          sx={{ borderRadius: "10px" }}
        />
      ) : (
        <ListCarousel
          title={name}
          gap={24}
          variant={"h3"}
          count_items={authors.length}
          bgColor={"var(--dark-purple)"}
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
