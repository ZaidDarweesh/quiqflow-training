class User {
    constructor({ id, name, email, profile = {}, active = true, role = "user" } = {}) {
        if (!id || !name || !email) {
            throw new Error("User requires id, name, and email.");
        }

        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.active = active;
        this.loggedIn = false;

        this.profile = { ...profile };
    }

    login() {
        if (!this.active) throw new Error("Cannot log in: user is deactivated.");
        if (this.loggedIn) throw new Error("Already logged in.");
        this.loggedIn = true;
        return true;
    }

    logout() {
        if (!this.loggedIn) throw new Error("Not logged in.");
        this.loggedIn = false;
        return true;
    }

    updateProfile(...patches) {
        if (patches.length === 0) throw new Error("updateProfile requires at least one patch object.");
        const merged = Object.assign({}, ...patches);

        const { name, email, ...profileRest } = merged;

        if (name !== undefined) this.name = name;
        if (email !== undefined) this.email = email;

        this.profile = { ...this.profile, ...profileRest };

        return {
            name: this.name,
            email: this.email,
            profile: { ...this.profile },
        };
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            active: this.active,
            loggedIn: this.loggedIn,
            profile: { ...this.profile },
        };
    }
}

class Admin extends User {
    constructor(opts, { permissions } = {}) {
        super({ ...opts, role: "admin" });
        this.permissions = permissions ?? ["READ_ALL", "WRITE_ALL", "DELETE_USER"];
    }

    hasPermission(perm) {
        return this.permissions.includes(perm);
    }

    deactivateUser(user) {
        if (!(user instanceof User)) throw new Error("deactivateUser expects a User instance.");
        if (!this.hasPermission("DELETE_USER")) throw new Error("Missing permission: DELETE_USER");
        user.active = false;
        user.loggedIn = false;
        return true;
    }
}

module.exports = { User, Admin };
