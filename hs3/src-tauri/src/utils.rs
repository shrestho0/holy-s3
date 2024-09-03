use bcrypt::{hash, verify, DEFAULT_COST};

#[tauri::command]
pub async fn hash_password(password: String) -> Result<String, String> {
    match hash(password, DEFAULT_COST) {
        Ok(hashed) => Ok(hashed),
        Err(_) => Err("Failed to hash the password".into()),
    }
}

#[tauri::command]
pub async fn verify_password(hashed: String, password: String) -> Result<bool, String> {
    match verify(password, &hashed) {
        Ok(valid) => Ok(valid),
        Err(_) => Err("Failed to verify the password".into()),
    }
}
