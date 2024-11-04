mod configs;
mod constants;
mod models;
mod modules;
mod schema;
mod types;

use std::sync::Once;

use actix_cors::Cors;
use actix_web::{
    middleware::{Logger, NormalizePath, TrailingSlash},
    web, App, HttpServer,
};
use configs::{initialize_pool, PORT};
use modules::config_service;

static INIT: Once = Once::new();

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    INIT.call_once(|| {
        dotenvy::dotenv().ok();

        std::env::set_var("RUST_LOG", "info");
        std::env::set_var("RUST_BACKTRACE", "1");
        env_logger::init();

        println!("Server is running at {}", *PORT);
    });

    // Initialize outside HttpServer::new so that it is shared across all workers
    let pool = initialize_pool();

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin() // Change this if you don't want to allow any origin to access the API
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTIONS"])
            .allowed_headers(vec!["Accept", "Content-Type", "Authorization"])
            .supports_credentials()
            .max_age(3600); // 1 hour

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .wrap(NormalizePath::new(TrailingSlash::Trim))
            .app_data(web::Data::new(pool.clone()))
            .configure(config_service)
        // .default_service(
        //     web::route()
        //         .guard(guard::Not(guard::Get()))
        //         .to(HttpResponse::BadRequest),
        // )
    })
    .bind(("127.0.0.1", *PORT))?
    .run()
    .await
}
