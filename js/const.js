export const apiGraphQLUrl = "https://zone01normandie.org/api/graphql-engine/v1/graphql"
export const ApiSignin = "https://zone01normandie.org/api/auth/signin" // Get JWT to access the GraphQL API (signin endpoint)
//You may make a POST request to the signin endpoint, and supply your credentials using Basic authentication, with base64 encoding.
export let content_type = { "Content-Type": "application/json" }
export let param = {
    method: "POST",
    headers: content_type
}

export let user_info = {
    query: `
    {
        user{
          id
          login
          totalUp
          totalDown
          auditRatio
          firstName
          lastName
          campus
          email
          attrs
          events(where: {event: {path: {_ilike: "/rouen/div-01"}}})  {
            level
           }
          xps {
            event {
              id
              createdAt
              endAt
              parentId
             }
            amount
            path
           }
         }
         transaction{
                id
                type
                amount 	
                objectId 	
                userId 	
                createdAt 	
                path
            }
      }`,
  }
