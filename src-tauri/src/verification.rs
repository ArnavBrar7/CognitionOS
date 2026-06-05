use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ClaimVerification {
    pub claim: String,
    pub is_verified: bool,
    pub contradiction_found: bool,
    pub confidence: f32,
    pub verification_source: String, // Context, Memory, System
    pub suggested_correction: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VerificationResult {
    pub is_safe_to_present: bool,
    pub claims_analyzed: Vec<ClaimVerification>,
}

#[tauri::command]
pub fn verify_claim(claims: Vec<String>, _context: String) -> Result<VerificationResult, String> {
    // In a real implementation, the Verification Engine cross-references
    // the claims against the active context and retrieved memory to detect hallucinations.

    let mut analyzed_claims = vec![];
    let mut safe_to_present = true;

    for claim in claims {
        // Mocking a hallucination detection logic
        let is_suspicious = claim.contains("guarantee") || claim.contains("100%");

        let cv = ClaimVerification {
            claim: claim.clone(),
            is_verified: !is_suspicious,
            contradiction_found: is_suspicious,
            confidence: if is_suspicious { 0.2 } else { 0.95 },
            verification_source: "System heuristics".into(),
            suggested_correction: if is_suspicious {
                Some("Remove absolute guarantees".into())
            } else {
                None
            },
        };

        if cv.contradiction_found {
            safe_to_present = false;
        }

        analyzed_claims.push(cv);
    }

    Ok(VerificationResult {
        is_safe_to_present: safe_to_present,
        claims_analyzed: analyzed_claims,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_verify_claim_contradiction() {
        let claims = vec!["I can guarantee 100% accuracy.".to_string()];
        let result = verify_claim(claims, "context".into()).unwrap();

        assert_eq!(result.is_safe_to_present, false);
        assert_eq!(result.claims_analyzed.len(), 1);
        assert_eq!(result.claims_analyzed[0].contradiction_found, true);
    }

    #[test]
    fn test_verify_claim_safe() {
        let claims = vec!["The system is designed with safety in mind.".to_string()];
        let result = verify_claim(claims, "context".into()).unwrap();

        assert_eq!(result.is_safe_to_present, true);
        assert_eq!(result.claims_analyzed[0].contradiction_found, false);
    }
}
