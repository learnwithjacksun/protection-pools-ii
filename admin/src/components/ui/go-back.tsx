import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoBack({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="cursor-pointer gap-1 flex items-center"
    >
      <div className="flex items-center gap-1 text-muted text-sm">
        <ChevronLeft size={18} />
        <span>Back </span>
      </div>
      <ChevronLeft size={18} className="text-muted" />
      <h3 className="font-space text-sm text-muted">{title}</h3>
    </div>
  );
}
