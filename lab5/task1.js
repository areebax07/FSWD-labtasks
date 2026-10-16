const applicants = [
    {
        id: 'A101',
        name: 'Sara Khan',
        age: '19',
        matricMarks: '91',
        intermediateMarks: '87',
        entryTest: '78',
        program: 'BSCS',
        feePaid: 'true'
    },
    {
        id: 'A102',
        name: 'Ahmed Ali',
        age: 'twenty',
        matricMarks: '88',
        intermediateMarks: '',
        entryTest: '72',
        program: 'BSSE',
        feePaid: 'false'
    },
    {
        id: 'A103',
        name: 'Hassan',
        age: '18',
        matricMarks: '76',
        intermediateMarks: '83',
        entryTest: '91',
        program: 'BSAI',
        feePaid: 'true'
    }
];

function processApplicant(applicant) {
    const age = Number(applicant.age);
    const matric = Number(applicant.matricMarks);
    const intermediate = Number(applicant.intermediateMarks);
    const entryTest = Number(applicant.entryTest);

    if (
        applicant.age.trim() === '' ||
        applicant.matricMarks.trim() === '' ||
        applicant.intermediateMarks.trim() === '' ||
        applicant.entryTest.trim() === '' ||
        !Number.isFinite(age) ||
        !Number.isFinite(matric) ||
        !Number.isFinite(intermediate) ||
        !Number.isFinite(entryTest) ||
        age < 17 || age > 30 ||
        matric < 0 || matric > 100 ||
        intermediate < 0 || intermediate > 100 ||
        entryTest < 0 || entryTest > 100
    ) {
        return { id: applicant.id, name: applicant.name, status: "INVALID DATA" };
    }

    if (!["BSCS", "BSSE", "BSAI"].includes(applicant.program)) {
        return { id: applicant.id, name: applicant.name, status: "INVALID DATA" };
    }

    const merit = matric * 0.2 + intermediate * 0.3 + entryTest * 0.5;

    let status;

    if (merit >= 70 && entryTest >= 60 && intermediate >= 60) {
        status = applicant.feePaid === "true" ? "SELECTED" : "WAITING";
    } else {
        status = "REJECTED";
    }

    return {
        id: applicant.id,
        name: applicant.name,
        age: age,
        program: applicant.program,
        merit: Number(merit.toFixed(2)),
        status: status
    };
}

const results = applicants.map(processApplicant);

console.log(results);

const validApplicants = results.filter(a => a.merit !== undefined);
const invalidApplicants = results.filter(a => a.status === "INVALID DATA");

const merits = validApplicants.map(a => a.merit);

const summary = {
    validApplicants: validApplicants.length,
    invalidApplicants: invalidApplicants.length,
    highestMeritApplicant: validApplicants.reduce((a, b) => a.merit > b.merit ? a : b),
    lowestMerit: Math.min(...merits),
    averageMerit: Number((merits.reduce((sum, merit) => sum + merit, 0) / merits.length).toFixed(2)),
    programCounts: {
        BSCS: results.filter(a => a.program === "BSCS").length,
        BSSE: results.filter(a => a.program === "BSSE").length,
        BSAI: results.filter(a => a.program === "BSAI").length
    }
};

console.log(summary);