use actix_web::{
    get,
    web::{Data, Path},
    HttpResponse, Responder,
};

use crate::{configs::PgPool, models::User, types::ErrorResponse};

#[get("/{id}")]
async fn get_user_by_id(pool: Data<PgPool>, id: Path<i32>) -> impl Responder {
    let mut conn = match pool.get() {
        Ok(connection) => connection,
        Err(err) => {
            return HttpResponse::InternalServerError().json(ErrorResponse::InternalError(format!(
                "Internal error: {}",
                err
            )))
        }
    };
    let id = id.into_inner();

    match User::get(&mut conn, id) {
        Ok(Some(user)) => HttpResponse::Ok().json(user),
        Ok(None) => HttpResponse::NotFound().json(ErrorResponse::NotFound(format!(
            "User with id {} not found",
            id
        ))),
        Err(err) => HttpResponse::InternalServerError().json(ErrorResponse::InternalError(
            format!("Internal error: {}", err),
        )),
    }
}
