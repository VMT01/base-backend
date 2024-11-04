mod check_health;
mod v1;

use actix_web::web;

pub fn config_service(cfg: &mut web::ServiceConfig) {
    cfg.service(check_health::hello)
        .service(web::scope("/api").configure(v1::config_service));
}
