import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch } from 'react-icons/fi';
import '../styles/github.css';

interface GitHubData {
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData>({
    publicRepos: 0,
    followers: 0,
    following: 0,
    stars: 0,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Deepu7777-prog');
        if (response.ok) {
          const userData = await response.json();
          setData({
            publicRepos: userData.public_repos || 0,
            followers: userData.followers || 0,
            following: userData.following || 0,
            stars: 0,
          });
          setLoaded(true);
        }
      } catch {
        // Use fallback data if API fails
        setData({ publicRepos: 10, followers: 5, following: 10, stars: 3 });
        setLoaded(true);
      }
    };

    fetchGitHubData();
  }, []);

  // Generate a mock contribution graph
  const contributionCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < 364; i++) {
      const rand = Math.random();
      let level = 0;
      if (rand > 0.7) level = 1;
      if (rand > 0.82) level = 2;
      if (rand > 0.9) level = 3;
      if (rand > 0.96) level = 4;
      cells.push(level);
    }
    return cells;
  }, []);

  const stats = [
    { label: 'Repos', value: data.publicRepos, icon: <FiGitBranch /> },
    { label: 'Stars', value: data.stars, icon: <FiStar /> },
    { label: 'Followers', value: data.followers, icon: null },
    { label: 'Following', value: data.following, icon: null },
  ];

  return (
    <motion.div
      className="github-stats"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="github-stats-header">
        <a
          href="https://github.com/Deepu7777-prog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub />
          GitHub Activity
        </a>
      </div>

      <div className="github-stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="github-stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -3 }}
          >
            <div className="github-stat-value">
              {loaded ? stat.value : '—'}
            </div>
            <div className="github-stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="github-contribution-graph">
        {contributionCells.map((level, i) => (
          <div
            key={i}
            className={`github-contribution-cell ${level > 0 ? `level-${level}` : ''}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
