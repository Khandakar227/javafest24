import { InputHTMLAttributes, useState, useRef, ChangeEvent } from "react";

interface AutoCompleteTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    suggestions: string[];
}
export const AutoCompleteTextInput = (props: AutoCompleteTextInputProps) => {
    const [search, setSearch] = useState<string>('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function onChange(e: ChangeEvent) {
        const value = (e.target as HTMLInputElement).value;
        setSearch(value);
    }

    function addValue(val: string) {
        console.log(val);
        if (inputRef.current) inputRef.current.value = val;
        // setFocused(false);
    }

    function onBlur() {
        setTimeout(() => setFocused(false), 200);
    }
    return (
        <div className="relative" onFocus={() => setFocused(true)} onBlur={onBlur}>
            <input ref={inputRef} onChange={onChange}
                autoComplete="off" {...props} />
            <div className={`${focused ? 'block' : 'hidden'} absolute top-full left-0 w-full rounded-sm bg-white max-h-[32ch] overflow-auto shadow`}>
                <ul>
                    {props.suggestions.filter(dc => dc.toLowerCase().includes(search.toLowerCase())).map(dc => (
                        <li onClick={() => addValue(dc)} key={dc} className="hover:bg-gray-100 p-2">{dc}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
