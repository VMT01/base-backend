use diesel::{pg::PgConnection, r2d2};

use super::DATABASE_URL;

type ConnectionManager = r2d2::ConnectionManager<PgConnection>;
pub type PgPool = r2d2::Pool<ConnectionManager>;
pub type PgPooled = r2d2::PooledConnection<ConnectionManager>;

pub fn initialize_pool() -> PgPool {
    let manager = r2d2::ConnectionManager::<PgConnection>::new(&*DATABASE_URL);
    r2d2::Pool::builder()
        .build(manager)
        .expect("Cannot build Postgres Connection Pool")
}
