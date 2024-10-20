import classNames from "classnames";

interface SearchBarProps {
    type?: string;
    placeHolder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const SearchBar = ({ type = "text", placeHolder = "Search", value, onChange, className }: SearchBarProps) => {
    return (
        <div className={classNames("search-bar", className)}>
            <input
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SearchBar;