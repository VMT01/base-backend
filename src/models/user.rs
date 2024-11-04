use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::{
    configs::PgPooled,
    schema::users::{self as users_table, dsl::*},
};

#[derive(Serialize, Deserialize, Selectable, Queryable, Insertable)]
#[diesel(table_name=users_table)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: i32,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub name: String,
}

impl User {
    pub fn get(conn: &mut PgPooled, user_id: i32) -> Result<Option<User>, diesel::result::Error> {
        users
            .find(user_id)
            .select(User::as_select())
            .first(conn)
            .optional()
    }
}
