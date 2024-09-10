// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {
    readonly avatar_url: string | null;
    readonly login: string | null;    
    readonly organizations_url: string | null;
    readonly repos_url: string | null;
}
