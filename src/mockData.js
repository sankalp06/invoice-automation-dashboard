export const MOCK_SUMMARY = {
  period: "today",
  emails_received: 142,
  attachments_processed: 118,
  attachment_validation_passed: 110,
  attachment_validation_failed: 8,
  ocr_completed: 104,
  ocr_failed: 6,
  translation_completed: 98,
  translation_failed: 6,
  extraction_completed: 95,
  extraction_failed: 3,
  filters: { country_code: null, source_lang: null }
};

export const MOCK_ATTACHMENTS = {
  period: "today",
  total: 6,
  attachments: [
    {
      run_id: "run-001-abc",
      workflow_name: "DocTranslator",
      step_name: "extraction_completed",
      status: "Completed",
      filename: "invoice_tr.pdf",
      original_file_link: "https://example.com/files/invoice_tr.pdf",
      translated_file_link: "https://example.com/files/invoice_tr_en.pdf",
      extracted_json_link: "https://example.com/files/invoice_tr_en.json",
      logged_at: "2025-05-30T12:34:56"
    },
    {
      run_id: "run-002-def",
      workflow_name: "DocTranslator",
      step_name: "translation_completed",
      status: "Completed",
      filename: "contract_de.docx",
      original_file_link: "https://example.com/files/contract_de.docx",
      translated_file_link: "https://example.com/files/contract_de_en.docx",
      extracted_json_link: null,
      logged_at: "2025-05-30T11:20:10"
    },
    {
      run_id: "run-003-ghi",
      workflow_name: "DocTranslator",
      step_name: "ocr_failed",
      status: "Failed",
      filename: "scan_jp.tiff",
      original_file_link: "https://example.com/files/scan_jp.tiff",
      translated_file_link: null,
      extracted_json_link: null,
      logged_at: "2025-05-30T10:05:33"
    },
    {
      run_id: "run-004-jkl",
      workflow_name: "DocTranslator",
      step_name: "extraction_completed",
      status: "Completed",
      filename: "report_fr.pdf",
      original_file_link: "https://example.com/files/report_fr.pdf",
      translated_file_link: "https://example.com/files/report_fr_en.pdf",
      extracted_json_link: "https://example.com/files/report_fr_en.json",
      logged_at: "2025-05-30T09:45:00"
    },
    {
      run_id: "run-005-mno",
      workflow_name: "DocTranslator",
      step_name: "validation_failed",
      status: "Failed",
      filename: "corrupted_es.pdf",
      original_file_link: "https://example.com/files/corrupted_es.pdf",
      translated_file_link: null,
      extracted_json_link: null,
      logged_at: "2025-05-30T08:30:22"
    },
    {
      run_id: "run-006-pqr",
      workflow_name: "DocTranslator",
      step_name: "ocr_completed",
      status: "Completed",
      filename: "form_zh.png",
      original_file_link: "https://example.com/files/form_zh.png",
      translated_file_link: "https://example.com/files/form_zh_en.pdf",
      extracted_json_link: null,
      logged_at: "2025-05-30T07:15:45"
    }
  ]
};
