use actix_web::web;

mod user;

pub fn config_service(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/v1").configure(user::config_service));
}
