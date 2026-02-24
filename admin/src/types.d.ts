interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  type: string;
  label?: string;
  error?: string;
}
interface InputWithoutIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  error?: string;
}

interface ButtonWithLoaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  initialText: string;
  loadingText: string;
}

interface SelectWithIconProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactNode;
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface SelectWithoutIconProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}
type MatchStatus = "pending" | "completed";
interface IMatch {
  id: number;
  week: number;
  matchNo: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
  isActive?: boolean;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  isAdmin: boolean
}
