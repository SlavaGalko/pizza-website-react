import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

const PizzaDetailed: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await axios.get(
          `https://644feb3cba9f39c6ab6fd55e.mockapi.io/pizzas/${id}`
        );
        setPizza(response.data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>...Loading</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="img" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique,
        dolor?
      </p>
      <h4>{pizza.price} ₴</h4>
    </div>
  );
};

export default PizzaDetailed;
