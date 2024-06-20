type CaloresDisplayProps = {
  calories: number;
  text: string;
};

export const CaloriesDisplay = ({ calories, text }: CaloresDisplayProps) => {
  return (
    <p className="grid grid-cols-1 gap-3 font-bold text-center text-white rounded-full">
      <span className="text-6xl font-black text-orange-600">{calories}</span>
      {text}
    </p>
  );
};
