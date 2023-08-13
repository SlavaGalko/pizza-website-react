import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={470}
      viewBox="0 0 280 470"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="20" y="250" rx="10" ry="10" width="250" height="28" />
      <rect x="20" y="300" rx="15" ry="15" width="250" height="90" />
      <circle cx="140" cy="120" r="120" />
      <rect x="20" y="430" rx="10" ry="10" width="100" height="28" />
      <rect x="150" y="425" rx="14" ry="14" width="120" height="40" />
    </ContentLoader>
  );
};

export default Skeleton;
