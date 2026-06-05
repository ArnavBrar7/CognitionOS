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
pub fn verify_claim(claims: Vec<String>, context: String) -> Result<VerificationResult, String> {
    // In production, the Verification Engine cross-references
    // the claims against the active context and retrieved memory to detect hallucinations.
    // It issues a secondary prompt to the ModelRuntime: "Does this claim contradict the context?"

    let mut analyzed_claims = vec![];
    let mut safe_to_present = true;

    for claim in claims {
        // Evaluate structural heuristic rather than just string mock
        let mut confidence = 0.95;
        let mut contradiction = false;

        // Example check: if a claim mentions something not in context, drop confidence
        if claim.len() > 10 && !context.is_empty() && !context.contains(&claim[..10]) {
            confidence -= 0.3;
        }

        // Example check: absolute guarantees are high risk for hallucinations
        if claim.to_lowercase().contains("guarantee") || claim.contains("100%") {
             confidence -= 0.5;
             contradiction = true;
        }

        let cv = ClaimVerification {
            claim: claim.clone(),
            is_verified: confidence > 0.8,
            contradiction_found: contradiction,
            confidence,
            verification_source: "System heuristics".into(),
            suggested_correction: if contradiction {
                Some("Remove absolute guarantees and verify against context".into())
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
        let result = verify_claim(claims, "The system is designed with safety in mind. It uses Rust.".into()).unwrap();

        assert_eq!(result.is_safe_to_present, true);
        assert_eq!(result.claims_analyzed[0].contradiction_found, false);
    }
}
