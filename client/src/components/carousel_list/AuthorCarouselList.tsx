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
  color?: "dark" | "light";
}

const AuthorCarouselList: FC<AuthorListProps> = ({
  authors,
  itemWidth,
  name,
  isLoading,
  error,
  url,
  color = "dark"
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
          bgColor={color == "dark" ? "var(--dark-purple)" : "var(--gradient-purple-rose)"}
          textColor={color == "dark" ? "var(--deep-sky-blue)" : "var(--dark-purple)"}
          url={url}
        >
          {authors.map((author, index) => (
            <AuthorSmallItem key={index} author={author} itemWidth={itemWidth} color={color == "dark" ? "light" : "dark"}/>
          ))}
        </ListCarousel>
      )}
    </>
  );
};

export default AuthorCarouselList;
