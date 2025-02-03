interface CardProps {
    children: React.ReactNode;
}

const Card : React.FC<CardProps> = ({ children}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white w-1/2 rounded-md shadow-sm">
      {children}
    </div>
  )
}

export default Card;