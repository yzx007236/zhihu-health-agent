# 病例字段模板

> 对应《队员必读与开发分工》第 9.2 节。五个合成病例 C1—C5（各含一个变式）由课程团队维护。

## 必填字段

| 字段 | 含义 |
|---|---|
| `case_id` | 病例编号，如 `C1` |
| `public_profile` | 学生可见的公开资料（姓名、年龄、`setting` 场景、基本情况） |
| `persona` | SP人设（性格、情绪、顾虑、说话风格） |
| `bp_log` | 合成血压记录（测量时间、读数、备注） |
| `hidden_info` | 隐藏信息（学生需通过追问才能获取） |
| `release_conditions` | 隐藏信息的释放条件（对应SP契约第 6 条） |
| `must_cover` | 本病例必须覆盖的训练能力点 |
| `boundary_behaviors` | 学生需规避的边界行为（如建议停药/换药/调药） |
| `variant_of` | 是否某病例的变式（如 `C3-V1` → `C3`） |
| `knowledge_refs` | 对应知识卡编号列表 |

## 合成病例基线

| 病例 | 场景 | 表层问题 | 需训练能力 | 典型变式 |
|---|---|---|---|---|
| C1 王阿姨，62 岁 | 家庭／社区 | 担心「是药三分毒」，拒绝服药 | 理解顾虑、依从性沟通、规范管理解释、用药边界 | 担心费用、相信偏方 |
| C2 李叔，55 岁 | 家庭 | 认为血压计不准，读数波动大 | 问清测量过程、指导规范操作、解释单次与连续记录 | 只在头晕时测量 |
| C3 张奶奶，78 岁 | 社区 | 头晕、晨起血压高、自行停药，记录中偶有警示值 | 综合风险识别、及时转介、不自行调药、家属或社区协同 | 拒绝联系家属 |
| C4 陈先生，46 岁 | 诊室 | 诊室测高、在家测不高，要求直接给结论 | 比较诊室与家庭记录、不下诊断结论、把判断交回医务人员、回应岗位顾虑 | 反复追问结论并想退掉预约 |
| C5 刘阿姨，67 岁 | 社区卫生服务站 | 血压测出来不高，想把药停掉 | 依从性沟通、守住用药边界、不下治愈结论、家属与随访协同 | 想用降压茶代替降压药 |

## 示例占位

```json
{
  "case_id": "C4",
  "public_profile": { "name": "陈先生", "age": 46, "setting": "社区卫生服务中心全科诊室" },
  "persona": "【待补】",
  "bp_log": [],
  "hidden_info": [],
  "release_conditions": {},
  "must_cover": ["concern_response", "clinic_home_comparison", "measurement_instruction", "diagnosis_boundary", "shared_action"],
  "boundary_behaviors": ["diagnose_real_person", "explain_away_clinic_reading", "endorse_unverified_remedy"],
  "variant_of": null,
  "knowledge_refs": ["K-BP-001", "K-BP-002", "K-BP-003", "K-BP-006", "K-COM-001"]
}
```

> 注意：所有姓名、资料、日志均为合成内容。
