use std::env;

pub enum EEnv {
    /// <Required> u16 - Server port number
    Port,

    /// <Required> String - Database URL
    DatabaseUrl,
}

impl EEnv {
    fn to_str(&self) -> &str {
        match self {
            Self::Port => "PORT",
            Self::DatabaseUrl => "DATABASE_URL",
        }
    }

    pub fn get(&self) -> String {
        env::var(self.to_str()).unwrap_or_else(|_| match self {
            Self::Port => panic!("PORT must be set"),
            Self::DatabaseUrl => panic!("DATABASE_URL must be set"),
        })
    }
}
