// import { Button } from "@/components/ui/button"
import { useState } from "react";
import UserInput from "./components/UserInput";
import RepoList from "./components/Repolist";
import CommitsChart from "./components/CommitsChart";
const token = import.meta.env.VITE_GITHUB_TOKEN;
interface Repo {
  id: number;
  name: string;
  html_url: string;
}

const App = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [commitsData, setCommitsData] = useState<
    { date: string; count: number }[]
  >([]);
  const [username, setUsername] = useState<string>("");

  const fetchCommitsData = async (username: string, repos: Repo[]) => {
    const since = new Date();
    since.setDate(since.getDate() - 7);
    const sinceISO = since.toISOString();

    let allCommits: any[] = [];

    for (const repo of repos) {
      const res = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?since=${sinceISO}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        allCommits = allCommits.concat(data);
      }
    }

    const counts: Record<string, number> = {};

    for (const commit of allCommits) {
      const date = new Date(commit.commit.author.date)
        .toISOString()
        .slice(0, 10);
      counts[date] = (counts[date] || 0) + 1;
    }

    const chartData = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i)); // last 7 days
      const dateStr = d.toISOString().slice(0, 10);
      return { date: dateStr, count: counts[dateStr] || 0 };
    });

    setCommitsData(chartData);
  };

  const fetchReops = async (username: string) => {
    setUsername(username);
    setLoading(true);
    setError("");
    setCommitsData([]);
    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("User not Found");
      }
      const data = await res.json();
      setRepos(data);
      await fetchCommitsData(username, data);
    } catch (err: any) {
      setError(err.message);
      setRepos([]);
      setCommitsData([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Github User Profile Analyzer</h1>
      <UserInput onSearch={fetchReops} />
      {error && <p className="text-red-500">{error}</p>}

      {username && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="md:w-1/2">
              <RepoList repos={repos} username={username} loading={loading} />
            </div>

            <div className="md:w-1/2">
              <CommitsChart
                data={commitsData}
                username={username}
                loading={loading}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default App;
