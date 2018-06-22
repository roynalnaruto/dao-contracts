const assert = require('assert');

const proposalStates = function (bN) {
  return {
    PROPOSAL_STATE_PREPROPOSAL: bN(1),
    PROPOSAL_STATE_INITIAL: bN(2),
    PROPOSAL_STATE_VETTED: bN(3),
    PROPOSAL_STATE_FUNDED: bN(4),
  };
};

const configs = function (bN) {
  return {
    CONFIG_MINIMUM_LOCKED_DGD: bN(10 ** 9),
  };
};

const roles = function (bN) {
  return {
    FOUNDERS: bN(2),
    PRLS: bN(3),
    KYC_ADMINS: bN(4),
  };
};

const phases = {
  LOCKING_PHASE: 1,
  MAIN_PHASE: 2,
};

const quarters = {
  QUARTER_1: 1,
  QUARTER_2: 2,
  QUARTER_3: 3,
};

const assertQuarter = function (timeNow, startOfDao, lockingPhaseDuration, quarterDuration, quarterId) {
  const quarterNow = Math.floor((timeNow - startOfDao) / quarterDuration) + 1;
  assert.strictEqual(quarterId, quarterNow);
};

// Locking phase : 1
// Main phase : 2
const getPhase = function (timeNow, startOfDao, lockingPhaseDuration, quarterDuration) {
  let phaseNow;
  if (((timeNow - startOfDao) % quarterDuration) < lockingPhaseDuration) {
    phaseNow = phases.LOCKING_PHASE;
  } else {
    phaseNow = phases.MAIN_PHASE;
  }
  return phaseNow;
};

const getTimeToNextPhase = function (timeNow, startOfDao, lockingPhaseDuration, quarterDuration) {
  const currentPhase = getPhase(timeNow, startOfDao, lockingPhaseDuration, quarterDuration);
  let timeToNextPhase;
  if (currentPhase === phases.LOCKING_PHASE) {
    timeToNextPhase = lockingPhaseDuration - ((timeNow - startOfDao) % quarterDuration);
  } else {
    timeToNextPhase = quarterDuration - ((timeNow - startOfDao) % quarterDuration);
  }
  return timeToNextPhase;
};

const daoConstantsKeys = function () {
  return {
    CONFIG_LOCKING_PHASE_DURATION: 'locking_phase_duration',
    CONFIG_QUARTER_DURATION: 'quarter_duration',
    CONFIG_VOTING_COMMIT_PHASE: 'voting_commit_phase',
    CONFIG_VOTING_PHASE_TOTAL: 'voting_phase_total',
    CONFIG_INTERIM_COMMIT_PHASE: 'interim_voting_commit_phase',
    CONFIG_INTERIM_PHASE_TOTAL: 'interim_voting_phase_total',
    CONFIG_DRAFT_QUORUM_FIXED_PORTION_NUMERATOR: 'draft_quorum_fixed_numerator',
    CONFIG_DRAFT_QUORUM_FIXED_PORTION_DENOMINATOR: 'draft_quorum_fixed_denominator',
    CONFIG_DRAFT_QUORUM_SCALING_FACTOR_NUMERATOR: 'draft_quorum_sfactor_numerator',
    CONFIG_DRAFT_QUORUM_SCALING_FACTOR_DENOMINATOR: 'draft_quorum_sfactor_denominator',
    CONFIG_VOTING_QUORUM_FIXED_PORTION_NUMERATOR: 'vote_quorum_fixed_numerator',
    CONFIG_VOTING_QUORUM_FIXED_PORTION_DENOMINATOR: 'vote_quorum_fixed_denominator',
    CONFIG_VOTING_QUORUM_SCALING_FACTOR_NUMERATOR: 'vote_quorum_sfactor_numerator',
    CONFIG_VOTING_QUORUM_SCALING_FACTOR_DENOMINATOR: 'vote_quorum_sfactor_denominator',
    CONFIG_DRAFT_QUOTA_NUMERATOR: 'draft_quota_numerator',
    CONFIG_DRAFT_QUOTA_DENOMINATOR: 'draft_quota_denominator',
    CONFIG_VOTING_QUOTA_NUMERATOR: 'voting_quota_numerator',
    CONFIG_VOTING_QUOTA_DENOMINATOR: 'voting_quota_denominator',
    CONFIG_MINIMAL_PARTICIPATION_POINT: 'CONFIG_MINIMAL_QP',
    CONFIG_QUARTER_POINT_SCALING_FACTOR: 'quarter_point_scaling_factor',
    CONFIG_REPUTATION_POINT_SCALING_FACTOR: 'rep_point_scaling_factor',
    CONFIG_MINIMAL_BADGE_PARTICIPATION_POINT: 'CONFIG_MINIMAL_B_QP',
    CONFIG_BADGE_QUARTER_POINT_SCALING_FACTOR: 'b_qp_scaling_factor',
    CONFIG_BADGE_REPUTATION_POINT_SCALING_FACTOR: 'b_rep_point_scaling_factor',
    CONFIG_QUARTER_POINT_DRAFT_VOTE: 'quarter_point_draft_vote',
    CONFIG_QUARTER_POINT_VOTE: 'quarter_point_vote',
    CONFIG_QUARTER_POINT_INTERIM_VOTE: 'quarter_point_interim_vote',
    CONFIG_QUARTER_POINT_CLAIM_RESULT: 'quarter_point_claim_result',
    CONFIG_QUARTER_POINT_MILESTONE_COMPLETION: 'q_p_milestone_completion',
    CONFIG_BONUS_REPUTATION_NUMERATOR: 'bonus_reputation_numerator',
    CONFIG_BONUS_REPUTATION_DENOMINATOR: 'bonus_reputation_denominator',
    CONFIG_SPECIAL_PROPOSAL_COMMIT_PHASE: 'special_proposal_commit_phase',
    CONFIG_SPECIAL_PROPOSAL_PHASE_TOTAL: 'special_proposal_phase_total',
    CONFIG_SPECIAL_QUOTA_NUMERATOR: 'config_special_quota_numerator',
    CONFIG_SPECIAL_QUOTA_DENOMINATOR: 'config_special_quota_denominator',
    CONFIG_SPECIAL_PROPOSAL_QUORUM_NUMERATOR: 'special_quorum_numerator',
    CONFIG_SPECIAL_PROPOSAL_QUORUM_DENOMINATOR: 'special_quorum_denominator',
    CONFIG_MAXIMUM_REPUTATION_DEDUCTION: 'config_max_reputation_deduction',
    CONFIG_PUNISHMENT_FOR_NOT_LOCKING: 'config_punishment_not_locking',
    CONFIG_REPUTATION_PER_EXTRA_QP_NUM: 'config_rep_per_extra_qp_num',
    CONFIG_REPUTATION_PER_EXTRA_QP_DEN: 'config_rep_per_extra_qp_den',
    CONFIG_PORTION_TO_BADGE_HOLDERS_NUM: 'config_bholder_portion_num',
    CONFIG_PORTION_TO_BADGE_HOLDERS_DEN: 'config_bholder_portion_den',
    CONFIG_DRAFT_VOTING_PHASE: 'config_draft_voting_phase',
    CONFIG_REPUTATION_POINT_BOOST_FOR_BADGE: 'config_rp_boost_per_badge',
  };
};

const daoConstantsValues = function (bN) {
  return {
    CONFIG_LOCKING_PHASE_DURATION: bN(864000),
    CONFIG_QUARTER_DURATION: bN(7776000),
    CONFIG_VOTING_COMMIT_PHASE: bN(1814400),
    CONFIG_VOTING_PHASE_TOTAL: bN(2419200),
    CONFIG_INTERIM_COMMIT_PHASE: bN(604800),
    CONFIG_INTERIM_PHASE_TOTAL: bN(864000),
    CONFIG_DRAFT_QUORUM_FIXED_PORTION_NUMERATOR: bN(20),
    CONFIG_DRAFT_QUORUM_FIXED_PORTION_DENOMINATOR: bN(100),
    CONFIG_DRAFT_QUORUM_SCALING_FACTOR_NUMERATOR: bN(60),
    CONFIG_DRAFT_QUORUM_SCALING_FACTOR_DENOMINATOR: bN(100),
    CONFIG_VOTING_QUORUM_FIXED_PORTION_NUMERATOR: bN(20),
    CONFIG_VOTING_QUORUM_FIXED_PORTION_DENOMINATOR: bN(100),
    CONFIG_VOTING_QUORUM_SCALING_FACTOR_NUMERATOR: bN(60),
    CONFIG_VOTING_QUORUM_SCALING_FACTOR_DENOMINATOR: bN(100),
    CONFIG_DRAFT_QUOTA_NUMERATOR: bN(30),
    CONFIG_DRAFT_QUOTA_DENOMINATOR: bN(100),
    CONFIG_VOTING_QUOTA_NUMERATOR: bN(30),
    CONFIG_VOTING_QUOTA_DENOMINATOR: bN(100),
    CONFIG_QUARTER_POINT_DRAFT_VOTE: bN(1),
    CONFIG_QUARTER_POINT_VOTE: bN(1),
    CONFIG_QUARTER_POINT_INTERIM_VOTE: bN(1),
    CONFIG_QUARTER_POINT_CLAIM_RESULT: bN(1),
    CONFIG_QUARTER_POINT_MILESTONE_COMPLETION: bN(3),
    CONFIG_BONUS_REPUTATION_NUMERATOR: bN(20),
    CONFIG_BONUS_REPUTATION_DENOMINATOR: bN(100),
    CONFIG_SPECIAL_PROPOSAL_COMMIT_PHASE: bN(1814400),
    CONFIG_SPECIAL_PROPOSAL_PHASE_TOTAL: bN(2419200),
    CONFIG_SPECIAL_QUOTA_NUMERATOR: bN(51),
    CONFIG_SPECIAL_QUOTA_DENOMINATOR: bN(100),
    CONFIG_SPECIAL_PROPOSAL_QUORUM_NUMERATOR: bN(70),
    CONFIG_SPECIAL_PROPOSAL_QUORUM_DENOMINATOR: bN(100),
    CONFIG_MAXIMUM_REPUTATION_DEDUCTION: bN(20),
    CONFIG_PUNISHMENT_FOR_NOT_LOCKING: bN(5),
    CONFIG_REPUTATION_PER_EXTRA_QP_NUM: bN(1),
    CONFIG_REPUTATION_PER_EXTRA_QP_DEN: bN(1),
    CONFIG_MINIMAL_PARTICIPATION_POINT: bN(3),
    CONFIG_QUARTER_POINT_SCALING_FACTOR: bN(10),
    CONFIG_REPUTATION_POINT_SCALING_FACTOR: bN(10),
    CONFIG_MINIMAL_BADGE_PARTICIPATION_POINT: bN(3),
    CONFIG_BADGE_QUARTER_POINT_SCALING_FACTOR: bN(10),
    CONFIG_BADGE_REPUTATION_POINT_SCALING_FACTOR: bN(10),
    CONFIG_PORTION_TO_BADGE_HOLDERS_NUM: bN(5),
    CONFIG_PORTION_TO_BADGE_HOLDERS_DEN: bN(100),
    CONFIG_DRAFT_VOTING_PHASE: bN(1209600),
    CONFIG_REPUTATION_POINT_BOOST_FOR_BADGE: bN(1000),
  };
};

const max = function (list) {
  let max = -1;
  for (const item of list) {
    if (item > max) max = item;
  }
  return max;
};

const timeLags = function () {
  return {
    ONE_SECOND_TIME_LAG: 1000,
  };
};

const sampleBadgeWeights = function (bN) {
  return [bN(10), bN(20), bN(30), bN(44)];
};

const sampleStakeWeights = function (bN) {
  return [
    bN(55 * (10 ** 9)),
    bN(120 * (10 ** 9)),
    bN(150 * (10 ** 9)),
    bN(175 * (10 ** 9)),
    bN(32 * (10 ** 9)),
    bN(41 * (10 ** 9)),
    bN(40 * (10 ** 9)),
    bN(30 * (10 ** 9)),
    bN(20 * (10 ** 9)),
    bN(46 * (10 ** 9)),
  ];
};

const EMPTY_BYTES = '0x0000000000000000000000000000000000000000000000000000000000000000';
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

module.exports = {
  proposalStates,
  configs,
  roles,
  daoConstantsKeys,
  daoConstantsValues,
  timeLags,
  sampleBadgeWeights,
  sampleStakeWeights,
  phases,
  quarters,
  getPhase,
  getTimeToNextPhase,
  assertQuarter,
  max,
  EMPTY_BYTES,
  EMPTY_ADDRESS,
};
