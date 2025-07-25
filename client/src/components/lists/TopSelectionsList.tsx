import TopSelectionsItem from "../items/TopSelectionsItem.tsx";

const top_5_genres = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
]

const TopSelectionsList = () => {
    return (
        <>
            {top_5_genres.map((index) =>
                <TopSelectionsItem key={index}/>
            )}
        </>
    );
};

export default TopSelectionsList;