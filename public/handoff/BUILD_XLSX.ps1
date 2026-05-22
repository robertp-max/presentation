# BUILD_XLSX.ps1
# Creates all Excel .xlsx workbooks for CI Institute of Nursing project handoff.
# Requires Microsoft Excel to be installed.

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

function Write-Wb {
    param(
        [string]$OutPath,
        [string]$SheetName,
        [string[]]$Headers,
        [object[][]]$Rows
    )
    $xl = $null; $wb = $null
    try {
        $xl = New-Object -ComObject Excel.Application
        $xl.Visible = $false
        $xl.DisplayAlerts = $false
        $wb = $xl.Workbooks.Add()
        while ($wb.Sheets.Count -gt 1) { $wb.Sheets.Item($wb.Sheets.Count).Delete() }
        $ws = $wb.Sheets.Item(1)
        $ws.Name = $SheetName

        $hColor = 0xD9E1F2  # light blue in BGR
        for ($c = 0; $c -lt $Headers.Count; $c++) {
            $cell = $ws.Cells.Item(1, $c+1)
            $cell.Value2 = $Headers[$c]
            $cell.Font.Bold = $true
            $cell.Interior.Color = $hColor
            $cell.WrapText = $true
        }
        for ($r = 0; $r -lt $Rows.Count; $r++) {
            for ($c = 0; $c -lt $Rows[$r].Count; $c++) {
                $cell = $ws.Cells.Item($r+2, $c+1)
                $cell.Value2 = $Rows[$r][$c]
                $cell.WrapText = $true
            }
        }
        $ws.Rows.Item(2).Select() | Out-Null
        $xl.ActiveWindow.FreezePanes = $true
        $ws.Columns.AutoFit() | Out-Null
        $used = $ws.UsedRange.Columns.Count
        for ($c = 1; $c -le $used; $c++) {
            if ($ws.Columns.Item($c).ColumnWidth -gt 55) { $ws.Columns.Item($c).ColumnWidth = 55 }
        }
        $dir = Split-Path $OutPath -Parent
        if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
        $wb.SaveAs($OutPath, 51)
        Write-Host "  OK: $OutPath" -ForegroundColor Green
    } finally {
        if ($wb) { $wb.Close($false) }
        if ($xl) { $xl.Quit() }
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject($xl) | Out-Null
        [GC]::Collect(); [GC]::WaitForPendingFinalizers()
    }
}

function Write-MultiWb {
    param([string]$OutPath, [hashtable[]]$Sheets)
    $xl = $null; $wb = $null
    try {
        $xl = New-Object -ComObject Excel.Application
        $xl.Visible = $false
        $xl.DisplayAlerts = $false
        $wb = $xl.Workbooks.Add()
        while ($wb.Sheets.Count -gt 1) { $wb.Sheets.Item($wb.Sheets.Count).Delete() }
        for ($si = 0; $si -lt $Sheets.Count; $si++) {
            $sd = $Sheets[$si]
            if ($si -eq 0) { $ws = $wb.Sheets.Item(1) }
            else { $ws = $wb.Sheets.Add([System.Reflection.Missing]::Value, $wb.Sheets.Item($wb.Sheets.Count)) }
            $ws.Name = $sd.Name
            $hColor = if ($sd.BgColor) { $sd.BgColor } else { 0xD9E1F2 }
            for ($c = 0; $c -lt $sd.Headers.Count; $c++) {
                $cell = $ws.Cells.Item(1,$c+1)
                $cell.Value2 = $sd.Headers[$c]
                $cell.Font.Bold = $true
                $cell.Interior.Color = $hColor
                $cell.WrapText = $true
            }
            for ($r = 0; $r -lt $sd.Rows.Count; $r++) {
                for ($c = 0; $c -lt $sd.Rows[$r].Count; $c++) {
                    $cell = $ws.Cells.Item($r+2,$c+1)
                    $cell.Value2 = $sd.Rows[$r][$c]
                    $cell.WrapText = $true
                }
            }
            $ws.Rows.Item(2).Select() | Out-Null
            $xl.ActiveWindow.FreezePanes = $true
            $ws.Columns.AutoFit() | Out-Null
            $used = $ws.UsedRange.Columns.Count
            for ($c = 1; $c -le $used; $c++) {
                if ($ws.Columns.Item($c).ColumnWidth -gt 55) { $ws.Columns.Item($c).ColumnWidth = 55 }
            }
        }
        $dir = Split-Path $OutPath -Parent
        if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
        $wb.SaveAs($OutPath, 51)
        Write-Host "  OK: $OutPath" -ForegroundColor Green
    } finally {
        if ($wb) { $wb.Close($false) }
        if ($xl) { $xl.Quit() }
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject($xl) | Out-Null
        [GC]::Collect(); [GC]::WaitForPendingFinalizers()
    }
}

$base = "c:\AI\CIION"
$ho   = "c:\AI\CIION\_Hand_Off"

$courses = @("CNA-CE-001","CNA-CE-002","CNA-CE-003","CNA-CE-004","CNA-CE-005","CNA-CE-006",
             "CNA-CE-007","CNA-CE-008","CNA-CE-009","CNA-CE-010","CNA-CE-011","CNA-CE-012")
$titles = @{
    "CNA-CE-001"="Infection Control and Standard Precautions"
    "CNA-CE-002"="Resident Rights and Abuse Prevention"
    "CNA-CE-003"="Communication and Documentation for CNAs"
    "CNA-CE-004"="Safety and Emergency Response"
    "CNA-CE-005"="Body Mechanics and Mobility Assistance"
    "CNA-CE-006"="Nutrition and Hydration Support"
    "CNA-CE-007"="Patient Care Skills Review"
    "CNA-CE-008"="Patient Care Procedures Review"
    "CNA-CE-009"="Vital Signs and Observation Reporting"
    "CNA-CE-010"="Long-Term Care Practice and Professionalism"
    "CNA-CE-011"="Rehabilitative and Restorative Care Support"
    "CNA-CE-012"="End-of-Life Care and Family Support"
}
$mods = @{
    "CNA-CE-001"="Modules 6, 12"; "CNA-CE-002"="Modules 2, 17"; "CNA-CE-003"="Modules 3, 15"
    "CNA-CE-004"="Modules 4, 12"; "CNA-CE-005"="Modules 5, 14"; "CNA-CE-006"="Module 11"
    "CNA-CE-007"="Module 8";      "CNA-CE-008"="Module 9";      "CNA-CE-009"="Modules 10, 15"
    "CNA-CE-010"="Modules 1, 13"; "CNA-CE-011"="Module 14";    "CNA-CE-012"="Module 16"
}

Write-Host "`n=== BUILDING XLSX FILES ===" -ForegroundColor Cyan

# 1. CNA Online CE Course List
Write-Host "`n1. CNA Online CE Course List"
$h = @("Course No.","Course Title","CE Hours","Delivery Type","Source Module(s)")
$rows = @()
foreach ($c in $courses) { $rows += ,@($c,$titles[$c],"2","Online asynchronous",$mods[$c]) }
Write-Wb "$base\OUTPUT_CNA_RECERT\03_COURSE_LIST\CNA_ONLINE_CE_COURSE_LIST.xlsx" "CNA CE Course List" $h $rows
Write-Wb "$ho\02_CNA_RECERT\CNA_ONLINE_CE_COURSE_LIST.xlsx" "CNA CE Course List" $h $rows

# 2. CNA Activity Resource Template
Write-Host "`n2. CNA Activity Resource Template"
$h2 = @("Course Short Name","Section Name","Activity Type","Activity Name","Required (1=yes)","Sequence","Notes")
$secDefs = @(
    @("Start Here","page","Orientation and Scope","1","1","Required orientation page"),
    @("Core A","lesson","Lesson Content Block A","1","2","Core instruction block A"),
    @("Core A","quiz","Knowledge Check A","1","3","Formative knowledge check - Section A"),
    @("Core B","lesson","Lesson Content Block B","1","4","Core instruction block B"),
    @("Core B","quiz","Knowledge Check B","1","5","Formative knowledge check - Section B"),
    @("Applied","quiz","Scenario Knowledge Check","1","6","Scenario-based applied activity"),
    @("Final","quiz","Posttest","1","7","Summative posttest - 80pct passing threshold - 3 attempts max"),
    @("Final","assign","Affidavit Acknowledgement","1","8","Required learner affidavit - blocks certificate until complete")
)
$rows2 = @()
foreach ($c in $courses) { foreach ($s in $secDefs) { $rows2 += ,(@($c) + $s) } }
Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\CNA_RECERT_MOODLE_BUILD\CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx" "Activity Resource Map" $h2 $rows2
Write-Wb "$ho\05_MOODLE_BUILD\CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx" "Activity Resource Map" $h2 $rows2

# 3. CNA Completion Rule Template
Write-Host "`n3. CNA Completion Rule Template"
$h3 = @("Course Short Name","Requires Identity Fields","Requires Min Active Minutes","Required Minutes","Requires Affidavit","Requires Posttest Pass","Passing Threshold","Certificate Release Rule","Notes")
$rows3 = @()
foreach ($c in $courses) {
    $rows3 += ,@($c,"Yes","Yes","100","Yes","Yes","80pct","Identity + min time + required activities + posttest pass + affidavit","Prep-only draft")
}
Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\CNA_RECERT_MOODLE_BUILD\CNA_COMPLETION_RULE_TEMPLATE.xlsx" "Completion Rules" $h3 $rows3
Write-Wb "$ho\05_MOODLE_BUILD\CNA_COMPLETION_RULE_TEMPLATE.xlsx" "Completion Rules" $h3 $rows3

# 4. CNA Reporting Evidence Template
Write-Host "`n4. CNA Reporting Evidence Template"
$h4 = @("Learner Name","Learner Email","CNA Cert Number","Course Short Name","Enrollment Date","Completion Date","Active Minutes","Posttest Score","Affidavit Complete","Certificate Released","Evidence Export Date","Admin Notes")
$rows4 = @()
foreach ($c in $courses) { $rows4 += ,@("","","",$c,"","","","","","","","") }
Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\CNA_RECERT_MOODLE_BUILD\CNA_REPORTING_EVIDENCE_TEMPLATE.xlsx" "Completion Evidence" $h4 $rows4
Write-Wb "$ho\05_MOODLE_BUILD\CNA_REPORTING_EVIDENCE_TEMPLATE.xlsx" "Completion Evidence" $h4 $rows4

# 5. CNA Quiz Bank Coverage Map
Write-Host "`n5. CNA Quiz Bank Coverage Map"
$h5 = @("Course Short Name","Question Set","Question Type","Min Questions in Bank","Drawn per Attempt","Passing Threshold","Retake Rule","Source Module(s)","Objective Coverage Notes","Status")
$qbData = @(
    @("CNA-CE-001","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Modules 6, 12","Covers all 8 course objectives","Draft"),
    @("CNA-CE-001","Knowledge Check A","MCQ/True-False","5","3-5","Formative - no pass required","Unlimited","Module 6","Infection basics formative","Draft"),
    @("CNA-CE-001","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Modules 6, 12","Applied care scenario - infection response","Draft"),
    @("CNA-CE-002","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Modules 2, 17","Covers all 8 course objectives","Draft"),
    @("CNA-CE-002","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 2","Resident rights formative check","Draft"),
    @("CNA-CE-002","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Modules 2, 17","Abuse recognition scenario","Draft"),
    @("CNA-CE-003","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Modules 3, 15","All 8 objectives - documentation focus","Draft"),
    @("CNA-CE-003","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 3","Communication formative check","Draft"),
    @("CNA-CE-003","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Modules 3, 15","Charting scenario","Draft"),
    @("CNA-CE-004","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Modules 4, 12","All 8 objectives - safety and emergency","Draft"),
    @("CNA-CE-004","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 4","Safety formative check","Draft"),
    @("CNA-CE-004","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Modules 4, 12","Emergency response scenario","Draft"),
    @("CNA-CE-005","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Modules 5, 14","All 8 objectives - body mechanics and mobility","Draft"),
    @("CNA-CE-005","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 5","Body mechanics formative check","Draft"),
    @("CNA-CE-005","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Modules 5, 14","Transfer technique scenario","Draft"),
    @("CNA-CE-006","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Module 11","All 8 objectives - nutrition and hydration","Draft"),
    @("CNA-CE-006","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 11","Nutrition formative check","Draft"),
    @("CNA-CE-006","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Module 11","Feeding and aspiration scenario","Draft"),
    @("CNA-CE-007","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Module 8","All 8 objectives - patient care skills","Draft"),
    @("CNA-CE-007","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 8","Personal care formative check","Draft"),
    @("CNA-CE-007","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Module 8","ADL assistance scenario","Draft"),
    @("CNA-CE-008","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Module 9","All 8 objectives - procedures","Draft"),
    @("CNA-CE-008","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 9","Procedure scope formative check","Draft"),
    @("CNA-CE-008","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Module 9","Catheter and I-and-O scenario","Draft"),
    @("CNA-CE-009","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Modules 10, 15","All 8 objectives - vital signs","Draft"),
    @("CNA-CE-009","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 10","Vital signs measurement formative","Draft"),
    @("CNA-CE-009","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Modules 10, 15","Abnormal VS reporting scenario","Draft"),
    @("CNA-CE-010","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Modules 1, 13","All 8 objectives - professionalism and psychosocial","Draft"),
    @("CNA-CE-010","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 1","CNA role and scope formative","Draft"),
    @("CNA-CE-010","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Modules 1, 13","Ethical and psychosocial scenario","Draft"),
    @("CNA-CE-011","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Module 14","All 8 objectives - restorative care","Draft"),
    @("CNA-CE-011","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 14","Restorative concepts formative","Draft"),
    @("CNA-CE-011","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Module 14","Restorative care plan scenario","Draft"),
    @("CNA-CE-012","Posttest","MCQ","20","10","80pct","3 attempts max with feedback","Module 16","All 8 objectives - end of life","Draft"),
    @("CNA-CE-012","Knowledge Check A","MCQ/True-False","5","3-5","Formative","Unlimited","Module 16","End-of-life comfort formative","Draft"),
    @("CNA-CE-012","Scenario Check","Scenario-based MCQ","5","2-3","Formative","Unlimited","Module 16","Family communication scenario","Draft")
)
Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\CNA_RECERT_MOODLE_BUILD\CNA_QUIZ_BANK_TEMPLATE.xlsx" "Quiz Bank Coverage Map" $h5 $qbData
Write-Wb "$ho\05_MOODLE_BUILD\CNA_QUIZ_BANK_TEMPLATE.xlsx" "Quiz Bank Coverage Map" $h5 $qbData

# 6. CNA Course Import Template (Moodle companion XLSX)
Write-Host "`n6. CNA Course Import Template (XLSX companion)"
$h6 = @("Course Short Name","Course Full Name","Category Path","Learner Type","CE Hours","Min Active Minutes","Visible (0=hidden)","Summary")
$rows6 = @()
foreach ($c in $courses) {
    $rows6 += ,@($c,$titles[$c],"CI Institute of Nursing Regulatory Programs / CNA Recert - Online CE","California CNA renewal CE participant","2","100","0","Prep-only shell - do not set visible until gate configuration verified")
}
Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\CNA_RECERT_MOODLE_BUILD\CNA_COURSE_IMPORT_TEMPLATE.xlsx" "Course Import (Working)" $h6 $rows6
Write-Wb "$ho\05_MOODLE_BUILD\CNA_COURSE_IMPORT_TEMPLATE.xlsx" "Course Import (Working)" $h6 $rows6

# 7. Moodle root-level draft templates
Write-Host "`n7. Moodle draft templates (root)"
Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\COURSE_IMPORT_TEMPLATE_DRAFT.xlsx" "Course Import Draft" $h6 @(,@("","","","","","","",""))
Write-Wb "$ho\05_MOODLE_BUILD\COURSE_IMPORT_TEMPLATE_DRAFT.xlsx" "Course Import Draft" $h6 @(,@("","","","","","","",""))

$h7b = @("Course Short Name","Question Category","Learning Objective","Question Type","Question Text","Answer Choices A-B-C-D","Correct Answer","Feedback Correct","Feedback Incorrect","Scored Y-N")
Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\QUIZ_BANK_TEMPLATE_DRAFT.xlsx" "Quiz Bank Draft" $h7b @(,@("","","","","","","","","",""))
Write-Wb "$ho\05_MOODLE_BUILD\QUIZ_BANK_TEMPLATE_DRAFT.xlsx" "Quiz Bank Draft" $h7b @(,@("","","","","","","","","",""))

Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\ACTIVITY_RESOURCE_TEMPLATE_DRAFT.xlsx" "Activity Resource Draft" $h2 @(,@("","","","","","",""))
Write-Wb "$ho\05_MOODLE_BUILD\ACTIVITY_RESOURCE_TEMPLATE_DRAFT.xlsx" "Activity Resource Draft" $h2 @(,@("","","","","","",""))

$h7d = @("Course Short Name","Requires Identity Fields","Requires Min Active Minutes","Requires Affidavit","Requires Posttest Pass","Passing Threshold","Certificate Release Rule","Notes")
Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\CERTIFICATE_COMPLETION_RULE_TEMPLATE_DRAFT.xlsx" "Completion Rule Draft" $h7d @(,@("","","","","","","",""))
Write-Wb "$ho\05_MOODLE_BUILD\CERTIFICATE_COMPLETION_RULE_TEMPLATE_DRAFT.xlsx" "Completion Rule Draft" $h7d @(,@("","","","","","","",""))

Write-Wb "$base\OUTPUT_MOODLE_COURSE_BUILD\REPORTING_COMPLETION_EVIDENCE_TEMPLATE_DRAFT.xlsx" "Reporting Evidence Draft" $h4 @(,@("","","","","","","","","","","",""))
Write-Wb "$ho\05_MOODLE_BUILD\REPORTING_COMPLETION_EVIDENCE_TEMPLATE_DRAFT.xlsx" "Reporting Evidence Draft" $h4 @(,@("","","","","","","","","","","",""))

# 8. HHA Student Attendance Template
Write-Host "`n8. HHA Student Attendance Template"
$h8 = @("Student Name","Student ID / Last 4 SSN","Course or Module","Date","Theory Hours","Clinical Hours","Instructor Name","Instructor Signature (print)","Student Signature (print)","Notes")
Write-Wb "$base\OUTPUT_HHA_INITIAL_40_HOUR\03_CURRICULUM\STUDENT_ATTENDANCE_TEMPLATE.xlsx" "Attendance" $h8 @(,@("","","","","","","","","",""))
Write-Wb "$ho\03_HHA_INITIAL\STUDENT_ATTENDANCE_TEMPLATE.xlsx" "Attendance" $h8 @(,@("","","","","","","","","",""))

# 9. HHA Student Competency Evaluation Template
Write-Host "`n9. HHA Student Competency Evaluation Template"
$h9 = @("Student Name","Module","Skill or Competency","Evaluation Date","Evaluator Name","Result (Pass/Fail/Needs Remediation)","Remediation Required (Y/N)","Remediation Date","Final Status","Notes")
Write-Wb "$base\OUTPUT_HHA_INITIAL_40_HOUR\03_CURRICULUM\STUDENT_EVALUATION_COMPETENCY_TEMPLATE.xlsx" "Competency Evaluation" $h9 @(,@("","","","","","","","","",""))
Write-Wb "$ho\03_HHA_INITIAL\STUDENT_EVALUATION_COMPETENCY_TEMPLATE.xlsx" "Competency Evaluation" $h9 @(,@("","","","","","","","","",""))

# 10. HHA Renewal Attendance Template
Write-Host "`n10. HHA Renewal Attendance Template"
$h10 = @("Participant Name","Session Title or Module","Session Date","Hours","Instructor","Attendance Status (Present/Absent/Excused)","Verification Notes")
Write-Wb "$base\OUTPUT_HHA_RENEWAL\ATTENDANCE_TRAINING_TEMPLATE.xlsx" "Attendance" $h10 @(,@("","","","","","",""))
Write-Wb "$ho\04_HHA_RENEWAL\ATTENDANCE_TRAINING_TEMPLATE.xlsx" "Attendance" $h10 @(,@("","","","","","",""))

# 11. CNA Moodle Build Overview (multi-sheet: one sheet per course)
Write-Host "`n11. CNA Moodle Build Overview (multi-sheet)"
$mbSheets = @()
foreach ($c in $courses) {
    $shRows = @()
    foreach ($s in $secDefs) { $shRows += ,(@($c) + $s) }
    $mbSheets += @{
        Name    = $c
        Headers = @("Course","Section","Activity Type","Activity Name","Required","Sequence","Notes")
        Rows    = $shRows
        BgColor = 0xDAEFE2
    }
}
Write-MultiWb "$base\OUTPUT_MOODLE_COURSE_BUILD\CNA_RECERT_MOODLE_BUILD\CNA_MOODLE_BUILD_OVERVIEW.xlsx" $mbSheets
Write-MultiWb "$ho\05_MOODLE_BUILD\CNA_MOODLE_BUILD_OVERVIEW.xlsx" $mbSheets

Write-Host "`n=== ALL XLSX FILES CREATED SUCCESSFULLY ===" -ForegroundColor Cyan
