const { User, Admin } = require("./user-class");

describe("User class (OOP + destructuring/spread)", () => {
    test("constructor sets fields and profile", () => {
        const u = new User({
            id: 1,
            name: "Zaid",
            email: "zaid@example.com",
            profile: { locale: "en", theme: "dark" },
        });

        expect(u.name).toBe("Zaid");
        expect(u.email).toBe("zaid@example.com");
        expect(u.role).toBe("user");
        expect(u.active).toBe(true);
        expect(u.loggedIn).toBe(false);
        expect(u.profile).toEqual({ locale: "en", theme: "dark" });
    });

    test("login/logout happy path", () => {
        const u = new User({ id: 2, name: "A", email: "a@a.com" });
        expect(u.login()).toBe(true);
        expect(u.loggedIn).toBe(true);
        expect(u.logout()).toBe(true);
        expect(u.loggedIn).toBe(false);
    });

    test("login twice throws; logout when not logged in throws", () => {
        const u = new User({ id: 3, name: "B", email: "b@b.com" });
        u.login();
        expect(() => u.login()).toThrow("Already logged in.");
        u.logout();
        expect(() => u.logout()).toThrow("Not logged in.");
    });

    test("updateProfile merges top-level (name/email) and profile immutably", () => {
        const u = new User({
            id: 4,
            name: "Old",
            email: "old@mail.com",
            profile: { locale: "en" },
        });

        const beforeProfile = u.profile;
        const snapshot = u.updateProfile(
            { name: "New Name", avatar: "pic.png" },
            { email: "new@mail.com", theme: "light" }
        );

        expect(u.name).toBe("New Name");
        expect(u.email).toBe("new@mail.com");
        expect(u.profile).toEqual({ locale: "en", avatar: "pic.png", theme: "light" });

        expect(u.profile).not.toBe(beforeProfile);

        expect(snapshot).toEqual({
            name: "New Name",
            email: "new@mail.com",
            profile: { locale: "en", avatar: "pic.png", theme: "light" },
        });
    });

    test("updateProfile requires at least one patch", () => {
        const u = new User({ id: 5, name: "C", email: "c@c.com" });
        expect(() => u.updateProfile()).toThrow("updateProfile requires at least one patch object.");
    });
});

describe("Admin subclass", () => {
    test("inherits from User and sets role=admin", () => {
        const admin = new Admin({ id: 10, name: "Admin", email: "admin@site.com" });
        expect(admin instanceof User).toBe(true);
        expect(admin.role).toBe("admin");
        expect(admin.hasPermission("DELETE_USER")).toBe(true);
    });

    test("deactivateUser toggles active=false and forces logout", () => {
        const admin = new Admin({ id: 11, name: "Root", email: "root@site.com" });
        const u = new User({ id: 12, name: "User", email: "u@site.com" });
        u.login();

        const ok = admin.deactivateUser(u);
        expect(ok).toBe(true);
        expect(u.active).toBe(false);
        expect(u.loggedIn).toBe(false);
    });

    test("deactivateUser requires permission and a User instance", () => {
        const admin = new Admin(
            { id: 13, name: "Ops", email: "ops@site.com" },
            { permissions: ["READ_ALL"] }
        );

        const u = new User({ id: 14, name: "Target", email: "t@site.com" });
        expect(() => admin.deactivateUser({})).toThrow("deactivateUser expects a User instance.");
        expect(() => admin.deactivateUser(u)).toThrow("Missing permission: DELETE_USER");
    });
});
