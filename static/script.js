
document.addEventListener("DOMContentLoaded", () => {
    const healthStatus = document.getElementById("health-status");
    const serviceStatus = document.getElementById("flask-service-status");
    const osName = document.getElementById("os-name");
    const pythonVersion = document.getElementById("python-version");
    const activityList = document.getElementById("activity-list");
    const currentTime = document.getElementById("current-time");

    function addActivity(message) {
        const item = document.createElement("li");
        item.textContent =
            `${new Date().toLocaleTimeString()} — ${message}`;

        activityList.prepend(item);

        while (activityList.children.length > 8) {
            activityList.lastElementChild.remove();
        }
    }

    function updateClock() {
        currentTime.textContent = new Date().toLocaleString();
    }

    updateClock();
    setInterval(updateClock, 1000);

    async function checkHealth() {
        try {
            const response = await fetch("/health", {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (data.status !== "healthy") {
                throw new Error("Unhealthy response");
            }

            healthStatus.textContent = "Healthy";
            healthStatus.style.color = "#37d6a0";

            serviceStatus.textContent = "Online";
            serviceStatus.classList.remove("demo");

            addActivity("Application health check passed");

        } catch (error) {
            healthStatus.textContent = "Unavailable";
            healthStatus.style.color = "#f87171";

            serviceStatus.textContent = "Offline";
            serviceStatus.style.color = "#f87171";

            addActivity(`Health check failed: ${error.message}`);
        }
    }

    async function loadSystemInfo() {
        try {
            const response = await fetch("/system");

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            osName.textContent = data.operating_system;
            pythonVersion.textContent = data.python_version;

            addActivity("System information retrieved");

        } catch (error) {
            osName.textContent = "Unavailable";
            pythonVersion.textContent = "Unavailable";
            addActivity("System information request failed");
        }
    }

    checkHealth();
    loadSystemInfo();

    setInterval(checkHealth, 30000);

    // Demonstration charts use simulated data.
    // They do not represent real host measurements.

    if (typeof Chart !== "undefined") {
        Chart.defaults.color = "#91a1b8";
        Chart.defaults.borderColor = "#25334a";

        const resourceCanvas =
            document.getElementById("resourceChart");

        new Chart(resourceCanvas, {
            type: "doughnut",
            data: {
                labels: [
                    "CPU Usage (Demo)",
                    "Memory Usage (Demo)",
                    "Remaining Capacity (Demo)"
                ],
                datasets: [{
                    data: [25, 35, 40],
                    backgroundColor: [
                        "#48b8ff",
                        "#37d6a0",
                        "#25334a"
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });

        const networkCanvas =
            document.getElementById("networkChart");

        new Chart(networkCanvas, {
            type: "line",
            data: {
                labels: [
                    "10:00", "10:05", "10:10",
                    "10:15", "10:20", "10:25",
                    "10:30", "10:35"
                ],
                datasets: [
                    {
                        label: "Incoming Traffic (Demo)",
                        data: [32, 45, 39, 60, 52, 72, 65, 81],
                        borderColor: "#48b8ff",
                        backgroundColor: "rgba(72,184,255,0.1)",
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: "Outgoing Traffic (Demo)",
                        data: [20, 30, 27, 42, 36, 49, 44, 58],
                        borderColor: "#37d6a0",
                        backgroundColor: "rgba(55,214,160,0.08)",
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                    mode: "index"
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Simulated Traffic Units"
                        }
                    }
                }
            }
        });

        addActivity("Demonstration charts initialized");
    } else {
        addActivity("Chart library unavailable");
    }

    // Sidebar navigation
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(item =>
                item.classList.remove("active")
            );

            link.classList.add("active");
        });
    });
});
