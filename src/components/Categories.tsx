import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};
const categories = [
  "All",
  "Meat",
  "Vegetarian",
  "Grill",
  "Spicy",
  "Closed",
];
const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              onClick={() => onChangeCategory(index)}
              className={value === index ? "active" : ""}
              key={index}
            >
              {
                category
              }
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
export default Categories;
