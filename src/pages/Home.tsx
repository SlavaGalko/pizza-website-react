import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { SORT_ITEMS_LIST } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Pagination from "../components/Pagination";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
  selectSortProp,
} from "../redux/slices/filterSlice";
import {
  FetchPizzasArg,
  fetchPizzas,
  selectPizzas,
} from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortProp = useSelector(selectSortProp);
  const { categoryId, sortType, sortMethod, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const onChangePageHandler = (pageCount: number) => {
    dispatch(setCurrentPage(pageCount));
  };

  const getApiData = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    dispatch(
      fetchPizzas({
        category,
        sortProp,
        sortMethod,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getApiData();
  }, [categoryId, sortProp, sortMethod, searchValue, currentPage]);

  const pizzasArr = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sortType={sortType} sortMethod={sortMethod} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <div className="content__error">
          <h2 className="content__error-title">
          an error has occurred <span>😕</span>
          </h2>
          <p className="content__error-text">
          Unfortunately, an error occurred while receiving data from the server,
            <br /> our specialists are already solving this problem!
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzasArr}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(pageCount: number) => onChangePageHandler(pageCount)}
      />
    </div>
  );
};

export default Home;
