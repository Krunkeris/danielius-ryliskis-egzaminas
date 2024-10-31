export type RegisterInputDataType = {
  username: string;
  email: string;
  password: string;
};

export type LoginInputDataType = {
  email: string;
  password: string;
};

export type UserInfoType = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user" | "";
  status: "accepted" | "blocked";
};

export type ProtectedRouteToHomeProps = {
  children: React.ReactNode;
};

export type ProtectedRouteToUserHomeProps = {
  children: React.ReactNode;
};

export type ProtectedRouteToAdminHomeProps = {
  children: React.ReactNode;
};

export type PostInputDataType = {
  userId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type PostType = {
  _id: string;
  userId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  status: "pending" | "accepted";
  likes: string[];
};

export type CardType = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  status: "pending" | "accepted";
  likes: string[];
  postsId?: string;
  UserId: string;
  showCommentButton?: boolean;
};

export type CommentType = {
  _id: string;
  postsId: string | undefined;
  authorId: string;
  text: string;
};

export type CategoryType = {
  _id: string;
  name: string;
};

export type HeaderPropsType = {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  setSelectedCategory?: (query: string) => void;
};

export type UserType = {
  username: string;
  email: string;
  _id: string;
  role: "user" | "admin";
  status: "accepted" | "blocked";
};
