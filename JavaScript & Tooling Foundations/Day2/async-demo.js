function mockFetch(url, { delay = 500, shouldFail = false, data = null } = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Request failed for ${url}`));
                return;
            }
            const payload = data ?? { url, message: "Success", ts: Date.now() };
            resolve({
                ok: true,
                json: () => Promise.resolve(payload),
            });
        }, delay);
    });
}

function promiseStyleDemo() {
    console.log("=== Promise style demo ===");

    mockFetch("/api/user", { delay: 300, data: { id: 1, name: "Zaid" } })
        .then((res) => res.json())
        .then((data) => {
            console.log("Promise success:", data);
            return mockFetch("/api/settings", { delay: 200, data: { theme: "dark" } });
        })
        .then((res) => res.json())
        .then((settings) => {
            console.log("Chained success:", settings);
        })
        .catch((err) => {
            console.error("Promise error:", err.message);
        })
        .finally(() => {
            console.log("Promise chain complete.\n");
        });

    mockFetch("/api/fail", { delay: 150, shouldFail: true })
        .then((res) => res.json())
        .then((data) => {
            console.log("This will not run:", data);
        })
        .catch((err) => {
            console.error("Handled failure:", err.message);
        })
        .finally(() => {
            console.log("Failure example complete.\n");
        });
}


async function asyncAwaitDemo() {
    console.log("=== async/await demo ===");

    try {
        const userRes = await mockFetch("/api/user", {
            delay: 250,
            data: { id: 1, name: "Zaid" },
        });
        const user = await userRes.json();
        console.log("Await success (user):", user);

        const postsRes = await mockFetch(`/api/users/${user.id}/posts`, {
            delay: 200,
            data: [{ id: 101, title: "Hello Async" }],
        });
        const posts = await postsRes.json();
        console.log("Sequential await (posts):", posts);

        const [settingsRes, notificationsRes] = await Promise.all([
            mockFetch("/api/settings", { delay: 300, data: { theme: "light" } }),
            mockFetch("/api/notifications", {
                delay: 350,
                data: [{ id: "n1", text: "Welcome!" }],
            }),
        ]);
        const [settings, notifications] = await Promise.all([
            settingsRes.json(),
            notificationsRes.json(),
        ]);
        console.log("Parallel await (settings):", settings);
        console.log("Parallel await (notifications):", notifications);
    } catch (err) {
        console.error("async/await caught error:", err.message);
    }

    try {
        await mockFetch("/api/will-error", { delay: 150, shouldFail: true });
        console.log("This line won't run due to error above.");
    } catch (err) {
        console.error("Handled async error:", err.message);
    } finally {
        console.log("async/await demo complete.\n");
    }
}

function withCallback(simulatedUrl, cb) {
    setTimeout(() => {
        const ok = Math.random() > 0.2;
        if (!ok) {
            cb(new Error(`Callback error for ${simulatedUrl}`));
        } else {
            cb(null, { url: simulatedUrl, status: "ok", ts: Date.now() });
        }
    }, 180);
}

function callbackToPromise(url) {
    return new Promise((resolve, reject) => {
        withCallback(url, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

async function callbackBridgeDemo() {
    console.log("=== Callback to Promise/await demo ===");
    try {
        const result = await callbackToPromise("/api/callback-bridge");
        console.log("Callback bridged result:", result);
    } catch (err) {
        console.error("Callback bridged error:", err.message);
    } finally {
        console.log("Callback bridge demo complete.\n");
    }
}

(async function main() {
    console.log("Running async-demo.js ...\n");
    promiseStyleDemo();
    await asyncAwaitDemo();
    await callbackBridgeDemo();
    console.log("All demos done.");
})();
