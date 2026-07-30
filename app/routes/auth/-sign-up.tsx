// With edge-managed identity there is no self-serve sign-up; new users are
// provisioned by the identity provider. Reuse the sign-in flow, which
// bounces authenticated users straight to the app.
export { default } from "./-sign-in";
