module.exports = {
	apps: [
		{
			name: "ssc-backend-staging",
			script: "./dist/index.js",
			instances: 1,
			exec_mode: "fork",
			watch: false,
			max_memory_restart: "500M",
			env: {
				NODE_ENV: "production",
				PORT: 3001,
			},
			error_file: "./logs/pm2-staging-error.log",
			out_file: "./logs/pm2-staging-out.log",
			log_date_format: "YYYY-MM-DD HH:mm:ss Z",
			merge_logs: true,
			autorestart: true,
			max_restarts: 10,
			min_uptime: "10s",
		},
	],
};

