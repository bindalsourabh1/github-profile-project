import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
    onSearch: (username: string) => void;
}

const UserInput: React.FC<Props> = ({ onSearch }) => {
    const [username, setUsername] = useState<string>('');
    return (
        <div className="flex gap-2">
            <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter GitHub username" 
            />
            <Button onClick={() => onSearch(username)} disabled={!username}>Analyze</Button>
        </div>
    );
};

export default UserInput;