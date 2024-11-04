use actix_web::web;

mod get_user_by_id;

pub fn config_service(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/users").service(get_user_by_id::get_user_by_id));
}
