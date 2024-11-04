use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub enum ErrorResponse {
    InternalError(String),
    NotFound(String),
}
