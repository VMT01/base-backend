use actix_web::{get, HttpResponse};

#[get("/")]
pub async fn hello() -> HttpResponse {
    HttpResponse::Ok().body("Server is running")
}
