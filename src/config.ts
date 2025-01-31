export const dexConfig = {
    authority: "http://localhost:5556/dex", // make not hard coded
    client_id: "example-app",
    client_secret: "example-app-secret",
    scope: "openid profile email offline_access",
    redirect_uri: window.location.origin,
    onSigninCallback: (): void => {
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        )
    }
};
