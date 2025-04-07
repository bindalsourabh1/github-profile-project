interface Repo {
    id: number, 
    name: string,
    html_url: string
}

interface Props{
    repos: Repo[];
    username: string;
    loading: boolean;
}

const RepoList = ({repos, username, loading} : Props) => {
    
    if(loading){
        return <p>Loading repositires... </p>
    }
    
    if(username && repos.length == 0) return <p>No repositries found</p>

    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Repositories</h2>
            <ul className="space-y-2">
            {repos.map(repo =>(
                <li key={repo.id} className="border p-2 rounded-lg">
                    <a href={repo.html_url} target="_blank" className="text-blue-600 underline">
                    {repo.name}
                    </a>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default RepoList;