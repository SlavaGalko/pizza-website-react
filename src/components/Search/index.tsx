import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";
const Search = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClearHandler = () => {
    dispatch(setSearchValue(""));
    setInputValue("");
    inputRef.current?.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 250),
    []
  );
  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.searchBlock}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="512px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        className={styles.searchBlock__searchIcon}
      >
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeInputHandler}
        value={inputValue}
        className={styles.searchBlock__input}
        placeholder="Enter the name of the pizza ..."
      />
      {inputValue && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 0 48 48"
          width="48"
          className={styles.searchBlock__closeIcon}
          onClick={() => onClickClearHandler()}
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
