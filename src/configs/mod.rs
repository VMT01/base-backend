mod database;

use lazy_static::lazy_static;

use crate::constants::EEnv;

lazy_static! {
    pub static ref PORT: u16 = EEnv::Port.get().parse().expect("PORT must be u16");
    pub static ref DATABASE_URL: String = EEnv::DatabaseUrl.get();
}

pub use database::*;
