import React from "react";
import { useDispatch } from "react-redux";
import {
  setSortType,
  setSortMethod,
  SortPropEnum,
} from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortProp: SortPropEnum;
};
type SortProps = {
  sortType: SortItem;
  sortMethod: string;
};

export const SORT_ITEMS_LIST: SortItem[] = [
  { name: "popularity", sortProp: SortPropEnum.RATING },
  { name: "price", sortProp: SortPropEnum.PRICE },
  { name: "the alphabet", sortProp: SortPropEnum.TITLE },
];

const Sort: React.FC<SortProps> = React.memo(({ sortType, sortMethod }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const onSortClickHandler = (object: SortItem) => {
    dispatch(setSortType(object));
    setIsVisible(false);
  };
  const toggleSortMethod = () => {
    sortMethod === "asc"
      ? dispatch(setSortMethod("desc"))
      : dispatch(setSortMethod("asc"));
  };
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          className={`sort__svg-${sortMethod}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => toggleSortMethod()}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sorting by:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sortType.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {SORT_ITEMS_LIST.map((item, index) => (
              <li
                className={sortType.sortProp === item.sortProp ? "active" : ""}
                onClick={() => onSortClickHandler(item)}
                key={index}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
export default Sort;
